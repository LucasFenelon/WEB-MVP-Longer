import { Logger } from './logger';

export interface DetailedFoodAnalysis {
  id: string;
  foodType: string[];
  analysis: string;
  calories: string;
  macros: {
    carbs: string;
    proteins: string;
    fats: string;
  };
}

export const detailedFoodAnalyses: DetailedFoodAnalysis[] = [
  {
    id: 'ramen',
    foodType: ['ramen', 'macarrão', 'sopa', 'japanese', 'japonês'],
    analysis: `## 🍜 Descrição do Prato

Você está saboreando um delicioso ramen japonês que parece ser do estilo tonkotsu ou shoyu, servido em uma tigela elegante com pontos pretos. O prato é uma verdadeira obra de arte culinária, composto por macarrão ramen fresquinho de aproximadamente 150-200g, mergulhado em um caldo vermelho-alaranjado tentador que provavelmente é à base de missô ou shoyu picante.

## 🥢 Componentes do Ramen

A composição inclui um ovo cozido marinado (ajitsuke tamago) perfeitamente cortado ao meio, revelando a gema cremosa e alaranjada. Uma generosa folha de nori (alga marinha) adiciona um toque oceânico ao conjunto, enquanto algumas fatias suculentas de chashu (barriga de porco) parecem derreter na boca. O prato é finalizado com cebolinha picadinha fresca e possivelmente alguns brotos crocantes que adicionam textura e frescor à tigela.

## 📊 Informações Nutricionais

Esta porção completa do ramen contém uma estimativa de 650-800 calorias, sendo uma refeição substancial e satisfatória. A distribuição de macronutrientes se apresenta da seguinte forma:

Calorias: 650-800
Carboidratos: 70-85g 
Proteínas: 25-35g
Gorduras: 25-35g`,
    calories: '650-800',
    macros: {
      carbs: '70-85g',
      proteins: '25-35g',
      fats: '25-35g'
    }
  },

  {
    id: 'salad',
    foodType: ['salada', 'folhas', 'verduras', 'frango', 'quinoa'],
    analysis: `## 🥗 Descrição da Salada

Que escolha fantástica! Você preparou uma salada super equilibrada e nutritiva. Vejo folhas verdes frescas como base, que são ricas em vitaminas A, C, K e folato. O peito de frango grelhado adiciona proteína magra de alta qualidade, essencial para manutenção muscular.

## 🌱 Componentes Identificados

A quinoa é uma excelente fonte de carboidratos complexos e proteína vegetal completa, contendo todos os aminoácidos essenciais. O fio de azeite extra virgem fornece gorduras monoinsaturadas saudáveis, que ajudam na absorção das vitaminas lipossolúveis presentes nas folhas.

## 📊 Informações Nutricionais

Esta salada balanceada contém aproximadamente 420-480 calorias e oferece uma distribuição ideal de macronutrientes:

Calorias: 420-480
Carboidratos: 35-45g
Proteínas: 32-38g
Gorduras: 18-22g`,
    calories: '420-480',
    macros: {
      carbs: '35-45g',
      proteins: '32-38g',
      fats: '18-22g'
    }
  },

  {
    id: 'breakfast',
    foodType: ['pão integral', 'ovo', 'café', 'manhã'],
    analysis: `## 🍳 Descrição do Café da Manhã

Excelente escolha para começar o dia! Seu café da manhã combina carboidratos complexos do pão integral com a proteína completa do ovo mexido. Esta combinação fornece energia sustentada e ajuda a manter a saciedade até o próximo lanche.

## 🌾 Componentes Analisados

O pão integral é rico em fibras, vitaminas do complexo B e minerais como ferro e magnésio. O ovo mexido fornece proteína de alto valor biológico, colina (importante para o cérebro) e vitaminas A, D, E e B12.

## 📊 Informações Nutricionais

Este café da manhã equilibrado contém aproximadamente:

Calorias: 280-320
Carboidratos: 25-30g
Proteínas: 18-22g
Gorduras: 12-16g`,
    calories: '280-320',
    macros: {
      carbs: '25-30g',
      proteins: '18-22g',
      fats: '12-16g'
    }
  },

  {
    id: 'smoothie',
    foodType: ['smoothie', 'vitamina', 'frutas', 'banana', 'morango'],
    analysis: `## 🥤 Descrição do Smoothie

Que delícia de smoothie! Esta bebida colorida e nutritiva é uma excelente forma de consumir múltiplas porções de frutas de uma só vez. Vejo uma combinação harmoniosa de frutas que oferece vitaminas, minerais e antioxidantes essenciais.

## 🍓 Componentes Identificados

As frutas vermelhas (morangos, framboesas) são ricas em vitamina C e antocianinas, poderosos antioxidantes. A banana adiciona potássio, vitamina B6 e carboidratos naturais para energia. Se há iogurte na mistura, temos também probióticos benéficos para a saúde intestinal.

## 📊 Informações Nutricionais

Este smoothie refrescante contém aproximadamente:

Calorias: 180-240
Carboidratos: 40-50g
Proteínas: 8-12g
Gorduras: 2-4g`,
    calories: '180-240',
    macros: {
      carbs: '40-50g',
      proteins: '8-12g',
      fats: '2-4g'
    }
  },

  {
    id: 'pasta',
    foodType: ['macarrão', 'pasta', 'molho', 'tomate', 'italiano'],
    analysis: `## 🍝 Descrição da Massa

Que prato clássico e reconfortante! Esta massa italiana parece ter um molho à base de tomate bem temperado. O macarrão fornece carboidratos complexos que são a principal fonte de energia do corpo, especialmente importante para quem pratica exercícios.

## 🍅 Componentes do Prato

O molho de tomate é rico em licopeno, um antioxidante poderoso que ajuda na proteção celular. Se há queijo ralado por cima, temos proteína e cálcio adicionais. Ervas como manjericão e orégano não só dão sabor, mas também oferecem propriedades anti-inflamatórias.

## 📊 Informações Nutricionais

Esta porção de massa contém aproximadamente:

Calorias: 450-550
Carboidratos: 65-75g
Proteínas: 15-20g
Gorduras: 12-18g`,
    calories: '450-550',
    macros: {
      carbs: '65-75g',
      proteins: '15-20g',
      fats: '12-18g'
    }
  },

  {
    id: 'sandwich',
    foodType: ['sanduíche', 'pão', 'lanche', 'presunto', 'queijo'],
    analysis: `## 🥪 Descrição do Sanduíche

Ótima opção de lanche! Este sanduíche parece bem equilibrado, combinando carboidratos do pão com proteínas e possivelmente alguns vegetais. É uma refeição prática e nutritiva para manter a energia entre as refeições principais.

## 🧀 Componentes Identificados

O pão fornece energia através dos carboidratos, enquanto o recheio proteico (presunto, queijo, ou frango) ajuda na saciedade e manutenção muscular. Se há vegetais como alface e tomate, temos fibras e vitaminas adicionais.

## 📊 Informações Nutricionais

Este sanduíche contém aproximadamente:

Calorias: 350-420
Carboidratos: 35-45g
Proteínas: 20-25g
Gorduras: 15-20g`,
    calories: '350-420',
    macros: {
      carbs: '35-45g',
      proteins: '20-25g',
      fats: '15-20g'
    }
  }
];

export class DetailedFoodAnalyzer {
  private static instance: DetailedFoodAnalyzer;

  static getInstance(): DetailedFoodAnalyzer {
    if (!DetailedFoodAnalyzer.instance) {
      DetailedFoodAnalyzer.instance = new DetailedFoodAnalyzer();
    }
    return DetailedFoodAnalyzer.instance;
  }

  analyzeFood(userMessage: string): Promise<string> {
    return new Promise((resolve) => {
      try {
        Logger.info('DetailedFoodAnalyzer.analyzeFood started');
        
        const normalizedMessage = userMessage.toLowerCase().trim();
        Logger.info(`Analyzing food for: "${normalizedMessage}"`);
        
        // Find matching food analysis
        const matchedAnalysis = detailedFoodAnalyses.find(analysis => 
          analysis.foodType.some(food => 
            normalizedMessage.includes(food.toLowerCase())
          )
        );

        if (matchedAnalysis) {
          setTimeout(() => {
            Logger.info('DetailedFoodAnalyzer.analyzeFood completed with match');
            resolve(matchedAnalysis.analysis);
          }, 2500);
        } else {
          // Generic food analysis
          const genericAnalysis = this.generateGenericAnalysis(userMessage);
          setTimeout(() => {
            Logger.info('DetailedFoodAnalyzer.analyzeFood completed with generic');
            resolve(genericAnalysis);
          }, 2000);
        }

      } catch (error) {
        Logger.error('Error in DetailedFoodAnalyzer.analyzeFood:', error);
        resolve('Que refeição interessante! Me conte mais detalhes sobre os ingredientes para eu fazer uma análise mais precisa. 🍽️');
      }
    });
  }

  private generateGenericAnalysis(userMessage: string): string {
    const analyses = [
      `## 🍽️ Análise da Refeição

Que escolha interessante! Vejo que você está cuidando bem da sua alimentação. Esta refeição parece ter uma boa combinação de nutrientes essenciais para manter sua energia e saúde em dia.

## 🔍 Observações Nutricionais

Baseado no que você descreveu, esta refeição oferece um equilíbrio interessante de macronutrientes. É importante manter essa variedade na alimentação para garantir todos os nutrientes que seu corpo precisa.

## 📊 Estimativa Nutricional

Calorias: 400-500
Carboidratos: 45-55g
Proteínas: 20-28g
Gorduras: 15-22g`,

      `## 🥗 Descrição Nutricional

Excelente escolha alimentar! Vejo que você está priorizando uma alimentação consciente. Esta refeição contribui positivamente para seus objetivos de saúde e bem-estar.

## 💡 Dicas Nutricionais

Esta combinação de alimentos oferece nutrientes importantes para seu metabolismo. Continue assim, mantendo essa diversidade na sua alimentação diária!

## 📈 Informações Estimadas

Calorias: 350-450
Carboidratos: 40-50g
Proteínas: 18-25g
Gorduras: 12-18g`
    ];

    return analyses[Math.floor(Math.random() * analyses.length)];
  }

  // Method to check if message contains food-related content
  containsFoodContent(message: string): boolean {
    const foodKeywords = [
      'comi', 'almocei', 'jantei', 'tomei café', 'lanche', 'comida', 'prato',
      'refeição', 'alimento', 'ingrediente', 'receita', 'cozinhei', 'preparei'
    ];
    
    const normalizedMessage = message.toLowerCase();
    return foodKeywords.some(keyword => normalizedMessage.includes(keyword));
  }
}

export default DetailedFoodAnalyzer; 