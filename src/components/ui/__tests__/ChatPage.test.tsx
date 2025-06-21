// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { useRouter } from 'next/navigation';
// import ChatPage from '../../../app/chat/page';

// // Mock Next.js router
// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// const mockPush = jest.fn();

// describe('ChatPage', () => {
//   beforeEach(() => {
//     (useRouter as jest.Mock).mockReturnValue({
//       push: mockPush,
//     });
//     mockPush.mockClear();
//   });

//   test('renders chat page with all main components', () => {
//     render(<ChatPage />);
    
//     // Check header elements
//     expect(screen.getByText('26 mai 2025')).toBeInTheDocument();
    
//     // Check assistant header
//     expect(screen.getByText('Assistente de saúde Longer')).toBeInTheDocument();
    
//     // Check AI messages
//     expect(screen.getByText('Oi Bruno, como foi seu dia hoje? 😊')).toBeInTheDocument();
//     expect(screen.getByText(/Vi aqui no seu Apple Watch/)).toBeInTheDocument();
//     expect(screen.getByText(/E a alimentação, como foi hoje?/)).toBeInTheDocument();
    
//     // Check timestamp
//     expect(screen.getByText('20:30')).toBeInTheDocument();
    
//     // Check quick reply buttons
//     expect(screen.getByText('☕ café da manhã')).toBeInTheDocument();
//     expect(screen.getByText('🍛 almoço')).toBeInTheDocument();
//     expect(screen.getByText('🍝 jantar')).toBeInTheDocument();
//     expect(screen.getByText('🥪 lanche')).toBeInTheDocument();
    
//     // Check input section
//     expect(screen.getByText('Converse com seu assistente de saúde')).toBeInTheDocument();
//   });

//   test('handles close button click', () => {
//     render(<ChatPage />);
    
//     const closeButton = screen.getByRole('button', { name: /close/i });
//     fireEvent.click(closeButton);
    
//     expect(mockPush).toHaveBeenCalledWith('/home');
//   });

//   test('handles quick reply button clicks', () => {
//     const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
//     render(<ChatPage />);
    
//     const breakfastButton = screen.getByText('☕ café da manhã');
//     fireEvent.click(breakfastButton);
    
//     expect(consoleSpy).toHaveBeenCalledWith('Quick reply:', '☕ café da manhã');
    
//     const lunchButton = screen.getByText('🍛 almoço');
//     fireEvent.click(lunchButton);
    
//     expect(consoleSpy).toHaveBeenCalledWith('Quick reply:', '🍛 almoço');
    
//     consoleSpy.mockRestore();
//   });

//   test('handles action button clicks', () => {
//     const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
//     render(<ChatPage />);
    
//     const actionButtons = screen.getAllByRole('button');
//     // Find attachment, camera, voice, and send buttons
//     const attachmentButton = actionButtons.find(button => 
//       button.querySelector('[data-testid="AddIcon"]')
//     );
//     const cameraButton = actionButtons.find(button => 
//       button.querySelector('[data-testid="CameraAltIcon"]')
//     );
//     const voiceButton = actionButtons.find(button => 
//       button.querySelector('[data-testid="MicIcon"]')
//     );
    
//     if (attachmentButton) {
//       fireEvent.click(attachmentButton);
//       expect(consoleSpy).toHaveBeenCalledWith('Opening attachment options');
//     }
    
//     if (cameraButton) {
//       fireEvent.click(cameraButton);
//       expect(consoleSpy).toHaveBeenCalledWith('Opening camera');
//     }
    
//     if (voiceButton) {
//       fireEvent.click(voiceButton);
//       expect(consoleSpy).toHaveBeenCalledWith('Opening voice recording');
//     }
    
//     consoleSpy.mockRestore();
//   });

//   test('renders chat header with correct styling', () => {
//     render(<ChatPage />);
    
//     const dateContainer = screen.getByText('26 mai 2025').closest('div');
//     expect(dateContainer).toHaveClass('chat-date-container');
    
//     const avatar = document.querySelector('.chat-avatar');
//     expect(avatar).toBeInTheDocument();
//   });

//   test('renders AI messages with correct styling', () => {
//     render(<ChatPage />);
    
//     const messages = document.querySelectorAll('.ai-message');
//     expect(messages).toHaveLength(3);
    
//     const messageTime = document.querySelector('.message-time');
//     expect(messageTime).toBeInTheDocument();
//   });

//   test('renders input section with correct elements', () => {
//     render(<ChatPage />);
    
//     const quickReplies = document.querySelector('.quick-replies');
//     expect(quickReplies).toBeInTheDocument();
    
//     const inputBar = document.querySelector('.chat-input-bar');
//     expect(inputBar).toBeInTheDocument();
    
//     const dividerLine = document.querySelector('.divider-line');
//     expect(dividerLine).toBeInTheDocument();
//   });
// }); 