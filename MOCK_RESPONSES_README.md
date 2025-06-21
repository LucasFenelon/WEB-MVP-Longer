# Mock AI Responses System

This system provides realistic AI responses for the Longer health assistant chat interface, based on the conversation patterns shown in the Figma designs.

## Features

### 1. General Mock Responses (`mockResponses.ts`)
- **Greeting responses**: Handles "oi", "olá", "bom dia", etc.
- **Meal-specific responses**: Quick replies for breakfast, lunch, dinner, snacks
- **Exercise responses**: Encouragement for running, gym, workouts
- **Health monitoring**: Responses about diabetes, glucose, insulin
- **Encouragement**: Positive reinforcement for healthy choices
- **Photo analysis**: Responses when users send photos
- **Default responses**: Fallback for unrecognized inputs

### 2. Detailed Food Analysis (`detailedFoodResponses.ts`)
- **Comprehensive nutritional analysis**: Detailed breakdowns like the ramen analysis in Figma
- **Specific food recognition**: Ramen, salads, breakfast items, smoothies, pasta, sandwiches
- **Nutritional information**: Calories, macronutrients (carbs, proteins, fats)
- **Generic food analysis**: Fallback for unrecognized foods

### 3. Smart Response Logic
- **Food detection**: Automatically detects food-related messages for detailed analysis
- **Photo recognition**: Special handling for photo uploads
- **Response variety**: Multiple responses per category to avoid repetition
- **Timing simulation**: Realistic delays to simulate AI processing time

## Usage Examples

### Quick Meal Responses
```typescript
// User clicks "☕ café da manhã"
// AI responds: "Que ótimo! Me conta o que você tomou no café da manhã hoje? É importante começar o dia com energia! ☕"
```

### Detailed Food Analysis
```typescript
// User: "Comi um ramen japonês delicioso hoje no almoço"
// AI provides detailed analysis with:
// - Dish description
// - Ingredient breakdown
// - Nutritional information (650-800 calories, macros)
```

### Exercise Encouragement
```typescript
// User: "Corri 5km hoje de manhã"
// AI: "Que incrível! Parabéns pela dedicação! 🏃‍♂️ Como você se sentiu durante o exercício?"
```

### Health Monitoring
```typescript
// User: "Estou preocupado com meus níveis de açúcar"
// AI: "Entendo sua preocupação. Com sua predisposição ao diabetes, é importante manter uma alimentação equilibrada. Vamos acompanhar juntos! 📈"
```

## Testing

Use the `MockResponseTester` class to test all response categories:

```typescript
import MockResponseTester from './src/utils/testMockResponses';

const tester = new MockResponseTester();

// Test all responses
const results = await tester.runAllTests();
tester.printTestResults(results.results);

// Test specific category
const greetingTests = await tester.testSpecificCategory('Cumprimentos');
```

## Available Test Categories

1. **Cumprimentos** - Greeting responses
2. **Refeições Rápidas** - Quick meal replies
3. **Análise Detalhada** - Detailed food analysis
4. **Exercícios** - Exercise responses
5. **Saúde** - Health monitoring
6. **Análise de Foto** - Photo analysis
7. **Agradecimentos** - Thank you responses
8. **Comida Genérica** - Generic food responses
9. **Diversos** - Default/fallback responses

## Integration

The mock responses are automatically integrated into the chat interface:

1. **Text messages**: Analyzed for food content, exercise mentions, health topics
2. **Photo uploads**: Automatically trigger food analysis responses
3. **Quick reply buttons**: Generate contextual responses
4. **Typing indicators**: Show realistic processing delays

## Response Patterns

Based on the Figma designs, responses follow these patterns:

- **Encouraging tone**: Always positive and supportive
- **Health-focused**: Emphasizes nutrition and wellness
- **Detailed analysis**: Provides specific nutritional information when relevant
- **Personal touch**: References user's health goals and concerns
- **Emoji usage**: Appropriate emojis to match the friendly tone

## Customization

To add new responses:

1. **General responses**: Add to `mockResponses` array in `mockResponses.ts`
2. **Food analysis**: Add to `detailedFoodAnalyses` array in `detailedFoodResponses.ts`
3. **Test cases**: Add to `testCases` array in `testMockResponses.ts`

Each response includes:
- **Trigger keywords**: What user input triggers this response
- **Multiple variations**: Different response options for variety
- **Timing delays**: Realistic response delays
- **Follow-up options**: Optional follow-up messages 