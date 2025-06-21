'use client';

import React, { useEffect, useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import { Close, Add, CameraAlt, Mic, KeyboardArrowUp } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Logger } from '../../src/utils/logger';
import MockResponseGenerator from '../../src/utils/mockResponses';
import DetailedFoodAnalyzer from '../../src/utils/detailedFoodResponses';

interface ChatMessage {
  id: string;
  type: 'text' | 'audio' | 'photo' | 'file';
  content: string;
  timestamp: string;
  sender: 'user' | 'ai';
  duration?: number;
  fileName?: string;
  fileSize?: number;
}

const ChatPage: React.FC = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [pendingAttachment, setPendingAttachment] = useState<{
    type: 'file' | 'photo' | 'audio';
    content: string;
    fileName?: string;
    fileSize?: number;
    duration?: number;
  } | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Mock response generators
  const mockResponseGenerator = MockResponseGenerator.getInstance();
  const foodAnalyzer = DetailedFoodAnalyzer.getInstance();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'text',
      content: 'Oi Bruno, como foi seu dia hoje? 😊',
      timestamp: '20:30',
      sender: 'ai'
    },
    {
      id: '2',
      type: 'text',
      content: 'Vi aqui no seu Apple Watch que você correu 5km em 1h - que incrível! Parabéns pela dedicação! 🏃‍♂️',
      timestamp: '20:30',
      sender: 'ai'
    },
    {
      id: '3',
      type: 'text',
      content: 'E a alimentação, como foi hoje? Com essa corrida e sua predisposição ao diabetes, é importante manter o equilíbrio nutricional. Me conta o que você comeu hoje? Quero saber se está tudo certinho com você!',
      timestamp: '20:30',
      sender: 'ai'
    }
  ]);

  useEffect(() => {
    Logger.info('ChatPage component initialized');
    return () => {
      // Cleanup camera stream on unmount
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      Logger.info('ChatPage component unmounted');
    };
  }, [cameraStream]);

  // Timer for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleClose = () => {
    try {
      Logger.info('handleClose function started');
      router.push('/home');
      Logger.info('handleClose function completed');
    } catch (error) {
      Logger.error('Error in handleClose:', error);
    }
  };

  const handleQuickReply = async (message: string) => {
    try {
      Logger.info('handleQuickReply function started');
      
      // Send the quick reply message
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'text',
        content: message,
        timestamp: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        sender: 'user'
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Generate AI response
      await generateAIResponse(message);
      
      Logger.info('handleQuickReply function completed');
    } catch (error) {
      Logger.error('Error in handleQuickReply:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      Logger.info('handleSendMessage function started');
      console.log('Send button clicked!', { inputText: inputText.trim(), pendingAttachment });
      
      let userMessage = '';
      
      // Send text message if there's text
      if (inputText.trim()) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'text',
          content: inputText.trim(),
          timestamp: new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          sender: 'user'
        };
        
        userMessage = inputText.trim();
        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        console.log('Text message sent:', newMessage);
      }
      
      // Send pending attachment if there's one
      if (pendingAttachment) {
        const newAttachmentMessage: ChatMessage = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: pendingAttachment.type,
          content: pendingAttachment.content,
          timestamp: new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          sender: 'user',
          fileName: pendingAttachment.fileName,
          fileSize: pendingAttachment.fileSize,
          duration: pendingAttachment.duration
        };
        
        setMessages(prev => [...prev, newAttachmentMessage]);
        
        // For photos, analyze them
        if (pendingAttachment.type === 'photo') {
          userMessage = 'Enviei uma foto da minha refeição';
        } else if (pendingAttachment.type === 'file') {
          userMessage = `Enviei um arquivo: ${pendingAttachment.fileName}`;
        } else if (pendingAttachment.type === 'audio') {
          userMessage = 'Enviei um áudio';
        }
        
        setPendingAttachment(null);
        console.log('Attachment message sent:', newAttachmentMessage);
      }
      
      // Generate AI response
      if (userMessage) {
        await generateAIResponse(userMessage);
      }
      
      Logger.info('handleSendMessage function completed');
    } catch (error) {
      Logger.error('Error in handleSendMessage:', error);
    }
  };

  const generateAIResponse = async (userMessage: string) => {
    try {
      Logger.info('generateAIResponse function started');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Check if it's a food-related message for detailed analysis
      const isFoodMessage = foodAnalyzer.containsFoodContent(userMessage) || 
                           userMessage.includes('foto') || 
                           userMessage.includes('imagem');
      
      let aiResponse = '';
      
      if (isFoodMessage) {
        // Use detailed food analyzer
        aiResponse = await foodAnalyzer.analyzeFood(userMessage);
      } else {
        // Use general mock responses
        aiResponse = await mockResponseGenerator.generateResponse(userMessage);
      }
      
      // Hide typing indicator
      setIsTyping(false);
      
      // Add AI response to messages
      const aiMessage: ChatMessage = {
        id: Date.now().toString() + '_ai',
        type: 'text',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      Logger.info('generateAIResponse function completed');
    } catch (error) {
      Logger.error('Error in generateAIResponse:', error);
      setIsTyping(false);
      
      // Fallback response
      const fallbackMessage: ChatMessage = {
        id: Date.now().toString() + '_ai_fallback',
        type: 'text',
        content: 'Desculpe, ocorreu um erro. Como posso te ajudar? 😅',
        timestamp: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    }
  };

  const handleAttachment = () => {
    try {
      Logger.info('handleAttachment function started');
      // Create file input element for photo/file upload
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '*/*'; // Accept all file types
      input.multiple = true; // Allow multiple file selection
      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files) {
          Array.from(files).forEach(file => {
            sendFileMessage(file);
          });
        }
      };
      input.click();
      Logger.info('handleAttachment function completed');
    } catch (error) {
      Logger.error('Error in handleAttachment:', error);
    }
  };

  const sendFileMessage = (file: File) => {
    try {
      Logger.info('sendFileMessage function started');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        
        // Set as pending attachment instead of sending directly
        setPendingAttachment({
          type: 'file',
          content: fileContent,
          fileName: file.name,
          fileSize: file.size
        });
        
        console.log('File ready for preview:', file.name);
      };
      
      reader.readAsDataURL(file);
      Logger.info('sendFileMessage function completed');
    } catch (error) {
      Logger.error('Error in sendFileMessage:', error);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCamera = () => {
    try {
      Logger.info('handleCamera function started');
      
      if (isCameraOpen) {
        // Close camera
        closeCamera();
      } else {
        // Open camera
        openCamera();
      }
      
      Logger.info('handleCamera function completed');
    } catch (error) {
      Logger.error('Error in handleCamera:', error);
    }
  };

  const openCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user', // Front camera by default
          width: { ideal: 640 },
          height: { ideal: 480 }
        }, 
        audio: false 
      })
      .then((stream) => {
        console.log('Camera access granted');
        setCameraStream(stream);
        setIsCameraOpen(true);
      })
      .catch((error) => {
        console.error('Camera access denied:', error);
        alert('Acesso à câmera negado. Verifique as permissões do navegador.');
      });
    } else {
      alert('Câmera não disponível neste dispositivo.');
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    try {
      Logger.info('capturePhoto function started');
      
      if (cameraStream) {
        const video = document.getElementById('camera-video') as HTMLVideoElement;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (video && context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0);
          
          const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          // Set as pending attachment instead of sending directly
          setPendingAttachment({
            type: 'photo',
            content: photoDataUrl
          });
          
          console.log('Photo ready for preview');
          
          // Stop camera stream after capture
          closeCamera();
        }
      }
      
      Logger.info('capturePhoto function completed');
    } catch (error) {
      Logger.error('Error in capturePhoto:', error);
    }
  };



  const handleVoice = () => {
    try {
      Logger.info('handleVoice function started');
      
      if (isRecording) {
        // Stop recording
        stopRecording();
      } else {
        // Start recording
        startRecording();
      }
      
      Logger.info('handleVoice function completed');
    } catch (error) {
      Logger.error('Error in handleVoice:', error);
    }
  };

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: false 
      })
      .then((stream) => {
        console.log('Microphone access granted');
        
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        
        const audioChunks: Blob[] = [];
        
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          
          // Set as pending attachment instead of recordedAudio
          setPendingAttachment({
            type: 'audio',
            content: audioUrl,
            duration: recordingTime
          });
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        };
        
        recorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        setRecordedAudio(null);
      })
      .catch((error) => {
        console.error('Microphone access denied:', error);
        alert('Acesso ao microfone negado. Verifique as permissões do navegador.');
      });
    } else {
      alert('Microfone não disponível neste dispositivo.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const discardAttachment = () => {
    try {
      Logger.info('discardAttachment function started');
      if (pendingAttachment) {
        // Clean up object URLs for audio
        if (pendingAttachment.type === 'audio') {
          URL.revokeObjectURL(pendingAttachment.content);
        }
        setPendingAttachment(null);
        setRecordingTime(0);
      }
      Logger.info('discardAttachment function completed');
    } catch (error) {
      Logger.error('Error in discardAttachment:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-profile">
            <img 
              src="/images/user-avatar.svg" 
              alt="Profile" 
              className="chat-avatar-img"
              width={32}
              height={32}
            />
          </div>
          
          <div className="chat-date-container">
            <Typography className="chat-date">26 mai 2025</Typography>
          </div>
          
          <div className="chat-close-container">
            <IconButton className="chat-close-button" onClick={handleClose}>
              <Close sx={{ color: '#1E1E1E', fontSize: '24px' }} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        <div className="chat-assistant-header">
          <Typography className="assistant-title">Assistente de saúde Longer</Typography>
        </div>
        
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={message.id}>
              <div className={`${message.sender === 'ai' ? 'ai-message' : 'user-message'}`}>
                {message.type === 'text' ? (
                  <Typography className="message-text">
                    {message.content}
                  </Typography>
                ) : message.type === 'audio' ? (
                  <div className="audio-message">
                    <audio controls src={message.content} className="message-audio-element">
                      Seu navegador não suporta o elemento de áudio.
                    </audio>
                    <Typography className="audio-message-duration">
                      {formatTime(message.duration || 0)}
                    </Typography>
                  </div>
                ) : message.type === 'photo' ? (
                  <div className="photo-message">
                    <img 
                      src={message.content} 
                      alt="Foto enviada" 
                      className="message-photo"
                    />
                  </div>
                ) : (
                  <div className="file-message">
                    <div className="file-icon">📎</div>
                    <div className="file-info">
                      <Typography className="file-name">
                        {message.fileName}
                      </Typography>
                      <Typography className="file-size">
                        {formatFileSize(message.fileSize || 0)}
                      </Typography>
                    </div>
                    <a 
                      href={message.content} 
                      download={message.fileName}
                      className="file-download-button"
                    >
                      ⬇️
                    </a>
                  </div>
                )}
              </div>
              
              {/* Show timestamp after the last message or after each user message */}
              {(index === messages.length - 1 || message.sender === 'user') && (
                <div className={`message-time ${message.sender === 'user' ? 'user-time' : ''}`}>
                  <Typography className="time-text">{message.timestamp}</Typography>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="ai-message typing-indicator">
              <Typography className="message-text">
                <span className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                Digitando...
              </Typography>
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="chat-input-section">
        {/* Recording Status */}
        {isRecording && (
          <div className="recording-status">
            <div className="recording-indicator">
              <div className="recording-dot"></div>
              <Typography className="recording-text">
                Gravando... {formatTime(recordingTime)}
              </Typography>
            </div>
            <button className="stop-recording-button" onClick={stopRecording}>
              Parar
            </button>
          </div>
        )}

        {/* Camera View */}
        {isCameraOpen && (
          <div className="camera-view">
            <video
              id="camera-video"
              autoPlay
              playsInline
              muted
              className="camera-video"
              ref={(video) => {
                if (video && cameraStream) {
                  video.srcObject = cameraStream;
                }
              }}
            />
            <div className="camera-controls">
              <button className="camera-cancel-button" onClick={closeCamera}>
                ✕ Cancelar
              </button>
              <button className="camera-capture-button" onClick={capturePhoto}>
                📷 Capturar
              </button>
            </div>
          </div>
        )}



        {/* Attachment Preview */}
        {pendingAttachment && (
          <div className="attachment-preview">
            {pendingAttachment.type === 'audio' && (
              <div className="audio-player">
                <audio controls src={pendingAttachment.content} className="audio-element">
                  Seu navegador não suporta o elemento de áudio.
                </audio>
                <Typography className="audio-duration">
                  Duração: {formatTime(pendingAttachment.duration || 0)}
                </Typography>
              </div>
            )}
            
            {pendingAttachment.type === 'photo' && (
              <div className="photo-player">
                <img src={pendingAttachment.content} alt="Foto capturada" className="preview-photo" />
              </div>
            )}
            
            {pendingAttachment.type === 'file' && (
              <div className="file-player">
                <div className="file-icon">📎</div>
                <div className="file-info">
                  <Typography className="file-name">
                    {pendingAttachment.fileName}
                  </Typography>
                  <Typography className="file-size">
                    {formatFileSize(pendingAttachment.fileSize || 0)}
                  </Typography>
                </div>
              </div>
            )}
            
            <div className="attachment-actions">
              <button className="discard-attachment-button" onClick={discardAttachment}>
                🗑️ Descartar
              </button>
              <Typography className="attachment-ready-text">
                Pronto para enviar! Clique na seta para enviar.
              </Typography>
            </div>
          </div>
        )}

        {/* Quick Reply Buttons - Hide during recording, camera, or when attachment is ready */}
        {!isRecording && !pendingAttachment && !isCameraOpen && (
          <div className="quick-replies">
            <button 
              className="quick-reply-button"
              onClick={() => handleQuickReply('☕ café da manhã')}
            >
              ☕ café da manhã
            </button>
            <button 
              className="quick-reply-button"
              onClick={() => handleQuickReply('🍛 almoço')}
            >
              🍛 almoço
            </button>
            <button 
              className="quick-reply-button"
              onClick={() => handleQuickReply('🍝 jantar')}
            >
              🍝 jantar
            </button>
            <button 
              className="quick-reply-button"
              onClick={() => handleQuickReply('🥪 lanche')}
            >
              🥪 lanche
            </button>
          </div>
        )}

        {/* Input Bar - Hide during recording or camera, but show when attachment is ready */}
        {!isRecording && !isCameraOpen && (
          <div className="chat-input-bar">
            <div className="input-content">
              {/* Hide text input when there's a pending attachment */}
              {!pendingAttachment && (
                <div className="input-divider">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Converse com seu assistente de saúde"
                    className="chat-text-input"
                  />
                </div>
              )}
              
              <div className={`input-actions ${pendingAttachment ? 'send-only' : ''}`}>
                {/* Hide action buttons when there's a pending attachment */}
                {!pendingAttachment && (
                  <div className="action-buttons">
                    <IconButton className="action-button" onClick={handleAttachment}>
                      <Add sx={{ color: '#1E1E1E', fontSize: '24px' }} />
                    </IconButton>
                    <IconButton 
                      className={`action-button ${isCameraOpen ? 'camera-active' : ''}`} 
                      onClick={handleCamera}
                    >
                      <CameraAlt sx={{ 
                        color: isCameraOpen ? '#007AFF' : '#1E1E1E', 
                        fontSize: '24px' 
                      }} />
                    </IconButton>
                    <IconButton 
                      className={`action-button ${isRecording ? 'recording' : ''}`} 
                      onClick={handleVoice}
                    >
                      <Mic sx={{ 
                        color: isRecording ? '#FF0000' : '#1E1E1E', 
                        fontSize: '24px' 
                      }} />
                    </IconButton>
                  </div>
                )}
                
                <div className="send-button-container">
                  <IconButton 
                    className={`send-button ${(inputText.trim() || pendingAttachment) ? 'enabled' : 'disabled'}`}
                    onClick={(e) => {
                      console.log('Button clicked!', e);
                      handleSendMessage();
                    }}
                    disabled={!inputText.trim() && !pendingAttachment}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <KeyboardArrowUp sx={{ 
                      color: (inputText.trim() || pendingAttachment) ? '#1E1E1E' : 'rgba(30, 30, 30, 0.3)', 
                      fontSize: '24px' 
                    }} />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage; 