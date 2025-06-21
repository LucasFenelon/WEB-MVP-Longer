import { Logger } from './logger';

export interface MockResponse {
  id: string;
  trigger: string[];
  responses: string[];
  delay?: number;
  followUp?: string[];
}

export const mockResponses: MockResponse[] = [
  // Greeting and initial responses
  {
    id: 'greeting',
    trigger: ['oi', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'hey'],
    responses: [
      'Oi! Como você está se sentindo hoje? 😊',
      'Olá! Que bom te ver por aqui! Como foi seu dia?',
      'Oi! Pronto para cuidarmos da sua saúde hoje? 💪'
    ],
    followUp: ['Como está sua energia hoje?', 'Já se alimentou bem hoje?']
  },

  // Meal-related responses
  {
    id: 'breakfast',
    trigger: ['☕ café da manhã', 'café da manhã', 'breakfast', 'manhã'],
    responses: [
      'Que ótimo! Me conta o que você tomou no café da manhã hoje? É importante começar o dia com energia! ☕',
      'Perfeito! O café da manhã é fundamental. Conseguiu incluir proteínas e fibras na sua refeição?',
      'Excelente escolha! Como foi seu café da manhã? Lembre-se que é a refeição mais importante do dia! 🌅'
    ],
    delay: 1500
  },

  {
    id: 'lunch',
    trigger: ['🍛 almoço', 'almoço', 'lunch', 'meio dia'],
    responses: [
      'Que bom! Como foi seu almoço? Conseguiu equilibrar proteínas, carboidratos e vegetais? 🥗',
      'Ótimo! Me conta sobre seu almoço. É importante manter o equilíbrio nutricional no meio do dia!',
      'Perfeito! O almoço é fundamental para manter a energia. O que você comeu?'
    ],
    delay: 1200
  },

  {
    id: 'dinner',
    trigger: ['🍝 jantar', 'jantar', 'dinner', 'noite'],
    responses: [
      'Que bom! Como foi seu jantar? Lembre-se de que à noite é melhor algo mais leve! 🌙',
      'Ótima escolha! Me conta sobre seu jantar. Conseguiu fazer uma refeição equilibrada?',
      'Perfeito! O jantar é importante, mas deve ser mais leve. O que você preparou?'
    ],
    delay: 1300
  },

  {
    id: 'snack',
    trigger: ['🥪 lanche', 'lanche', 'snack', 'lanchinho'],
    responses: [
      'Que legal! Os lanches são importantes para manter a energia. O que você escolheu? 🥪',
      'Ótimo! Me conta sobre seu lanche. Conseguiu escolher algo nutritivo?',
      'Perfeito! Lanches saudáveis ajudam a manter o metabolismo ativo. Qual foi sua escolha?'
    ],
    delay: 1000
  },

  // Food analysis responses
  {
    id: 'food_description',
    trigger: ['comi', 'almocei', 'jantei', 'tomei café', 'comer', 'comida'],
    responses: [
      'Que delícia! Vou analisar sua refeição e te dar algumas dicas nutricionais. Um momento... 🔍',
      'Interessante! Deixe-me avaliar os nutrientes dessa refeição para você. Analisando... 📊',
      'Ótima escolha! Vou fazer uma análise nutricional completa. Aguarde um instante... ⚡'
    ],
    delay: 2000,
    followUp: [
      'Essa refeição tem um ótimo equilíbrio de macronutrientes! 👏',
      'Vi que você incluiu proteínas de qualidade na sua refeição!',
      'Parabéns pela escolha consciente dos alimentos!'
    ]
  },

  // Exercise responses
  {
    id: 'exercise',
    trigger: ['corri', 'corrida', 'academia', 'treino', 'exercício', 'malhar'],
    responses: [
      'Que incrível! Parabéns pela dedicação! 🏃‍♂️ Como você se sentiu durante o exercício?',
      'Fantástico! Vi aqui no seu Apple Watch que você se exercitou. Como foi a performance?',
      'Perfeito! Exercitar-se é fundamental para sua saúde. Me conta como foi!'
    ],
    delay: 1500,
    followUp: [
      'Lembre-se de se hidratar bem após o exercício!',
      'É importante fazer um lanche pós-treino para recuperação!',
      'Que tal alongar um pouco agora?'
    ]
  },

  // Health monitoring
  {
    id: 'diabetes_concern',
    trigger: ['diabetes', 'açúcar', 'glicose', 'insulina'],
    responses: [
      'Entendo sua preocupação. Com sua predisposição ao diabetes, é importante manter uma alimentação equilibrada. Vamos acompanhar juntos! 📈',
      'Muito importante você estar atento a isso! Vamos monitorar sua alimentação para manter a glicose estável.',
      'Perfeita consciência! Com acompanhamento adequado, podemos prevenir complicações. Como estão seus níveis?'
    ],
    delay: 2000
  },

  // Positive reinforcement
  {
    id: 'encouragement',
    trigger: ['obrigado', 'valeu', 'legal', 'ótimo', 'bom'],
    responses: [
      'Fico feliz em ajudar! Estamos juntos nessa jornada de saúde! 💪',
      'Por nada! Sua dedicação é inspiradora! Continue assim! ⭐',
      'É um prazer te acompanhar! Você está no caminho certo! 🎯'
    ],
    delay: 800
  },

  // Photo analysis
  {
    id: 'photo_analysis',
    trigger: ['photo', 'image', 'foto', 'imagem'],
    responses: [
      'Que foto interessante! Vou analisar os alimentos para você... 📸',
      'Deixe-me identificar os ingredientes dessa imagem... 🔍',
      'Ótima foto! Analisando o conteúdo nutricional... ⚡'
    ],
    delay: 3000,
    followUp: [
      '## 🍜 Descrição do Prato\n\nIdentifiquei um prato delicioso! Vou te dar uma análise completa dos nutrientes.',
      '## 📊 Informações Nutricionais\n\nEssa refeição tem uma composição muito interessante de macronutrientes.',
      '## 🥢 Componentes Identificados\n\nVejo alguns ingredientes muito nutritivos nessa preparação!'
    ]
  },

  // Default responses
  {
    id: 'default',
    trigger: [''],
    responses: [
      'Interessante! Me conte mais sobre isso. Como posso te ajudar com sua saúde hoje? 🤔',
      'Entendi! Que tal conversarmos sobre sua alimentação ou exercícios? Como você está se sentindo?',
      'Legal! Estou aqui para te ajudar com questões de saúde e nutrição. O que você gostaria de saber?'
    ],
    delay: 1000
  }
];

export class MockResponseGenerator {
  private static instance: MockResponseGenerator;
  private responseHistory: string[] = [];

  static getInstance(): MockResponseGenerator {
    if (!MockResponseGenerator.instance) {
      MockResponseGenerator.instance = new MockResponseGenerator();
    }
    return MockResponseGenerator.instance;
  }

  generateResponse(userMessage: string): Promise<string> {
    return new Promise((resolve) => {
      try {
        Logger.info('MockResponseGenerator.generateResponse started');
        
        const normalizedMessage = userMessage.toLowerCase().trim();
        Logger.info(`Generating response for: "${normalizedMessage}"`);
        
        // Find matching response
        let matchedResponse = mockResponses.find(response => 
          response.trigger.some(trigger => 
            trigger === '' || normalizedMessage.includes(trigger.toLowerCase())
          )
        );

        // If no specific match, use default
        if (!matchedResponse) {
          matchedResponse = mockResponses.find(r => r.id === 'default')!;
        }

        // Select a random response from the matched category
        const responses = matchedResponse.responses;
        const randomIndex = Math.floor(Math.random() * responses.length);
        let selectedResponse = responses[randomIndex];

        // Avoid repeating the same response
        if (this.responseHistory.includes(selectedResponse) && responses.length > 1) {
          const availableResponses = responses.filter(r => !this.responseHistory.includes(r));
          if (availableResponses.length > 0) {
            selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];
          }
        }

        // Add to history (keep last 5)
        this.responseHistory.push(selectedResponse);
        if (this.responseHistory.length > 5) {
          this.responseHistory.shift();
        }

        const delay = matchedResponse.delay || 1500;
        
        setTimeout(() => {
          Logger.info('MockResponseGenerator.generateResponse completed');
          resolve(selectedResponse);
        }, delay);

      } catch (error) {
        Logger.error('Error in MockResponseGenerator.generateResponse:', error);
        resolve('Desculpe, ocorreu um erro. Como posso te ajudar? 😅');
      }
    });
  }

  generateFollowUp(responseId: string): Promise<string | null> {
    return new Promise((resolve) => {
      try {
        Logger.info('MockResponseGenerator.generateFollowUp started');
        
        const matchedResponse = mockResponses.find(r => r.id === responseId);
        
        if (matchedResponse?.followUp && Math.random() > 0.5) {
          const followUps = matchedResponse.followUp;
          const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)];
          
          setTimeout(() => {
            Logger.info('MockResponseGenerator.generateFollowUp completed');
            resolve(randomFollowUp);
          }, 3000);
        } else {
          resolve(null);
        }
      } catch (error) {
        Logger.error('Error in MockResponseGenerator.generateFollowUp:', error);
        resolve(null);
      }
    });
  }

  // Simulate thinking/processing state
  generateThinkingResponse(): Promise<string> {
    return new Promise((resolve) => {
      const thinkingMessages = [
        'Analisando sua mensagem... 🤔',
        'Processando informações... ⚡',
        'Verificando dados nutricionais... 📊',
        'Consultando base de conhecimento... 🔍'
      ];
      
      const randomThinking = thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
      
      setTimeout(() => {
        resolve(randomThinking);
      }, 500);
    });
  }
}

export default MockResponseGenerator; 