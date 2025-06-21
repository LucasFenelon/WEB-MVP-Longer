import MockResponseGenerator from './mockResponses';
import DetailedFoodAnalyzer from './detailedFoodResponses';
import { Logger } from './logger';

export interface TestCase {
  id: string;
  category: string;
  input: string;
  expectedType: 'general' | 'food' | 'detailed_food';
  description: string;
}

export const testCases: TestCase[] = [
  // Greeting tests
  {
    id: 'greeting_1',
    category: 'Cumprimentos',
    input: 'Oi',
    expectedType: 'general',
    description: 'Cumprimento simples'
  },
  {
    id: 'greeting_2',
    category: 'Cumprimentos',
    input: 'Olá, bom dia!',
    expectedType: 'general',
    description: 'Cumprimento formal'
  },

  // Quick reply meal tests
  {
    id: 'meal_breakfast',
    category: 'Refeições Rápidas',
    input: '☕ café da manhã',
    expectedType: 'general',
    description: 'Resposta rápida para café da manhã'
  },
  {
    id: 'meal_lunch',
    category: 'Refeições Rápidas',
    input: '🍛 almoço',
    expectedType: 'general',
    description: 'Resposta rápida para almoço'
  },
  {
    id: 'meal_dinner',
    category: 'Refeições Rápidas',
    input: '🍝 jantar',
    expectedType: 'general',
    description: 'Resposta rápida para jantar'
  },
  {
    id: 'meal_snack',
    category: 'Refeições Rápidas',
    input: '🥪 lanche',
    expectedType: 'general',
    description: 'Resposta rápida para lanche'
  },

  // Detailed food analysis tests
  {
    id: 'food_ramen',
    category: 'Análise Detalhada',
    input: 'Comi um ramen japonês delicioso hoje no almoço',
    expectedType: 'detailed_food',
    description: 'Análise detalhada de ramen - deve incluir informações nutricionais completas'
  },
  {
    id: 'food_salad',
    category: 'Análise Detalhada',
    input: 'Almocei uma salada com folhas verdes, frango grelhado e quinoa',
    expectedType: 'detailed_food',
    description: 'Análise detalhada de salada - deve incluir macronutrientes'
  },
  {
    id: 'food_breakfast_detailed',
    category: 'Análise Detalhada',
    input: 'Tomei café da manhã com pão integral e ovo mexido',
    expectedType: 'detailed_food',
    description: 'Análise detalhada de café da manhã'
  },
  {
    id: 'food_smoothie',
    category: 'Análise Detalhada',
    input: 'Fiz um smoothie com banana, morango e iogurte',
    expectedType: 'detailed_food',
    description: 'Análise detalhada de smoothie'
  },
  {
    id: 'food_pasta',
    category: 'Análise Detalhada',
    input: 'Jantei macarrão com molho de tomate',
    expectedType: 'detailed_food',
    description: 'Análise detalhada de massa italiana'
  },
  {
    id: 'food_sandwich',
    category: 'Análise Detalhada',
    input: 'Comi um sanduíche de presunto e queijo no lanche',
    expectedType: 'detailed_food',
    description: 'Análise detalhada de sanduíche'
  },

  // Exercise tests
  {
    id: 'exercise_running',
    category: 'Exercícios',
    input: 'Corri 5km hoje de manhã',
    expectedType: 'general',
    description: 'Resposta sobre corrida'
  },
  {
    id: 'exercise_gym',
    category: 'Exercícios',
    input: 'Fui na academia fazer treino de musculação',
    expectedType: 'general',
    description: 'Resposta sobre academia'
  },

  // Health monitoring tests
  {
    id: 'health_diabetes',
    category: 'Saúde',
    input: 'Estou preocupado com meus níveis de açúcar no sangue',
    expectedType: 'general',
    description: 'Resposta sobre diabetes e glicose'
  },
  {
    id: 'health_insulin',
    category: 'Saúde',
    input: 'Como está minha insulina?',
    expectedType: 'general',
    description: 'Resposta sobre insulina'
  },

  // Photo analysis tests
  {
    id: 'photo_meal',
    category: 'Análise de Foto',
    input: 'Enviei uma foto da minha refeição',
    expectedType: 'detailed_food',
    description: 'Análise de foto de comida'
  },
  {
    id: 'photo_generic',
    category: 'Análise de Foto',
    input: 'Tirei uma foto do meu prato',
    expectedType: 'detailed_food',
    description: 'Análise genérica de foto'
  },

  // Encouragement tests
  {
    id: 'thanks_1',
    category: 'Agradecimentos',
    input: 'Obrigado pela ajuda!',
    expectedType: 'general',
    description: 'Resposta de agradecimento'
  },
  {
    id: 'thanks_2',
    category: 'Agradecimentos',
    input: 'Valeu, muito legal!',
    expectedType: 'general',
    description: 'Resposta informal de agradecimento'
  },

  // Generic food tests
  {
    id: 'generic_food_1',
    category: 'Comida Genérica',
    input: 'Comi uma pizza hoje',
    expectedType: 'detailed_food',
    description: 'Análise genérica de comida não específica'
  },
  {
    id: 'generic_food_2',
    category: 'Comida Genérica',
    input: 'Preparei um prato especial para o jantar',
    expectedType: 'detailed_food',
    description: 'Análise genérica de preparação'
  },

  // Default response tests
  {
    id: 'random_1',
    category: 'Diversos',
    input: 'Como está o tempo hoje?',
    expectedType: 'general',
    description: 'Pergunta não relacionada à saúde - deve usar resposta padrão'
  },
  {
    id: 'random_2',
    category: 'Diversos',
    input: 'Qual é o sentido da vida?',
    expectedType: 'general',
    description: 'Pergunta filosófica - deve usar resposta padrão'
  }
];

export class MockResponseTester {
  private mockGenerator: MockResponseGenerator;
  private foodAnalyzer: DetailedFoodAnalyzer;

  constructor() {
    this.mockGenerator = MockResponseGenerator.getInstance();
    this.foodAnalyzer = DetailedFoodAnalyzer.getInstance();
  }

  async runSingleTest(testCase: TestCase): Promise<{
    testCase: TestCase;
    response: string;
    responseTime: number;
    success: boolean;
    error?: string;
  }> {
    try {
      Logger.info(`Running test: ${testCase.id} - ${testCase.description}`);
      
      const startTime = Date.now();
      let response = '';
      
      if (testCase.expectedType === 'detailed_food' || 
          this.foodAnalyzer.containsFoodContent(testCase.input) ||
          testCase.input.includes('foto') || 
          testCase.input.includes('imagem')) {
        response = await this.foodAnalyzer.analyzeFood(testCase.input);
      } else {
        response = await this.mockGenerator.generateResponse(testCase.input);
      }
      
      const responseTime = Date.now() - startTime;
      
      return {
        testCase,
        response,
        responseTime,
        success: true
      };
      
    } catch (error) {
      Logger.error(`Test failed: ${testCase.id}`, error);
      return {
        testCase,
        response: '',
        responseTime: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async runAllTests(): Promise<{
    totalTests: number;
    successfulTests: number;
    failedTests: number;
    results: Array<Awaited<ReturnType<MockResponseTester['runSingleTest']>>>;
  }> {
    Logger.info('Starting comprehensive mock response tests');
    
    const results = [];
    let successfulTests = 0;
    let failedTests = 0;
    
    for (const testCase of testCases) {
      const result = await this.runSingleTest(testCase);
      results.push(result);
      
      if (result.success) {
        successfulTests++;
      } else {
        failedTests++;
      }
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    Logger.info(`Tests completed: ${successfulTests} successful, ${failedTests} failed`);
    
    return {
      totalTests: testCases.length,
      successfulTests,
      failedTests,
      results
    };
  }

  async testSpecificCategory(category: string): Promise<Awaited<ReturnType<typeof this.runSingleTest>>[]> {
    const categoryTests = testCases.filter(test => test.category === category);
    const results = [];
    
    Logger.info(`Testing category: ${category} (${categoryTests.length} tests)`);
    
    for (const testCase of categoryTests) {
      const result = await this.runSingleTest(testCase);
      results.push(result);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results;
  }

  getAvailableCategories(): string[] {
    const categories = new Set(testCases.map(test => test.category));
    return Array.from(categories);
  }

  printTestResults(results: Array<Awaited<ReturnType<MockResponseTester['runSingleTest']>>>): void {
    console.log('\n=== MOCK RESPONSE TEST RESULTS ===\n');
    
    const categorySet = new Set(results.map(r => r.testCase.category));
    const categories = Array.from(categorySet);
    
    categories.forEach(category => {
      console.log(`📁 ${category.toUpperCase()}`);
      console.log('─'.repeat(50));
      
      const categoryResults = results.filter(r => r.testCase.category === category);
      
      categoryResults.forEach(result => {
        const status = result.success ? '✅' : '❌';
        const time = result.success ? `(${result.responseTime}ms)` : '';
        
        console.log(`${status} ${result.testCase.description} ${time}`);
        
        if (result.success) {
          console.log(`   Input: "${result.testCase.input}"`);
          console.log(`   Response: "${result.response.substring(0, 100)}${result.response.length > 100 ? '...' : ''}"`);
        } else {
          console.log(`   Error: ${result.error}`);
        }
        console.log('');
      });
    });
  }
}

export default MockResponseTester; 