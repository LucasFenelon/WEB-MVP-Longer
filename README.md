# Longer - Web MVP

A responsive web application for intelligent diet monitoring with DNA-based plans and real-time AI tracking.

## 🚀 Features

- **Responsive Design**: Optimized for mobile devices (iPhone 8 Plus specifications)
- **Modern UI**: Material UI with Tailwind CSS for beautiful, consistent design
- **TypeScript**: Full type safety and modern development experience
- **Next.js 14**: App Router with server-side rendering
- **Firebase Ready**: Authentication infrastructure setup
- **Testing**: Comprehensive test suite with Cypress

## 📱 Design

Based on Figma design specifications with:
- iPhone-optimized layout (402px max width)
- Dark theme with gradient background
- Animated components and smooth interactions
- Status bar matching iOS design patterns

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Material UI + Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Firebase Auth (ready for implementation)
- **Testing**: Cypress for E2E testing
- **Development**: ESLint, Prettier for code quality

## 🎯 Project Structure

```
WEB-MVP-Longer/
├── app/                    # Next.js 13+ App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with theme
│   └── page.tsx           # Onboarding page
├── src/
│   ├── components/        # Reusable components
│   │   └── ui/           # UI components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Business logic
│   ├── types/            # TypeScript definitions
│   ├── utils/            # Utility functions
│   └── contexts/         # React contexts
├── public/
│   └── images/           # Downloaded Figma assets
└── cypress/              # E2E tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WEB-MVP-Longer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### 📱 Mobile Testing

The app is optimized for mobile viewing. Test on:
- Chrome DevTools mobile simulation
- iPhone 8 Plus dimensions (414x736)
- Safari mobile browser

## 🎨 Design Implementation

### Key Components

- **StatusBar**: iPhone-style status bar with time and battery
- **OnboardingPage**: Main landing page with CTA buttons
- **Material UI Theme**: Custom dark theme matching Figma specs
- **Responsive Layout**: Flexbox-based layout adapting to screen sizes

### Colors & Typography

- **Primary**: #FFFFFF (white)
- **Secondary**: #F3F3F3 (light gray)
- **Background**: Linear gradient with dark overlay
- **Fonts**: Inter (body), SF Pro (interface elements)

## 🧪 Testing

### Running Tests

```bash
# Run Cypress tests
npm run test

# Run development server for testing
npm run dev
```

### Test Coverage

- Component rendering tests
- User interaction tests
- Responsive design verification
- Accessibility compliance

## 📚 Development Guidelines

Following cursor definitions:

- **Functional Components**: React Hooks pattern
- **TypeScript**: Strict type checking
- **Error Handling**: Try/catch with proper logging
- **Logging**: Function entry/exit and error logging
- **Testing**: Minimum one test per component/function
- **Code Style**: Airbnb TypeScript/React style guide

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run Cypress tests
```

## 🌟 Key Features

### Responsive Onboarding
- Mobile-first design approach
- iPhone 8 Plus optimized layout
- Smooth animations and transitions
- Material UI components with custom theming

### Authentication Ready
- Firebase Authentication setup
- Clean service layer abstraction
- Support for multiple sign-in methods
- Mock/real implementation switching

### Performance Optimized
- Next.js 14 App Router
- Server-side rendering
- Image optimization
- Code splitting

## 📖 Next Steps

1. **Authentication Implementation**: Connect Firebase Auth
2. **Navigation**: Add React Router for page transitions
3. **State Management**: Implement global state with Context API
4. **API Integration**: Connect to backend services
5. **Advanced Testing**: Add more comprehensive test coverage

## 🤝 Contributing

1. Follow the cursor definitions in `.cursor/rules/`
2. Write tests for all new components
3. Use TypeScript for type safety
4. Follow functional programming principles
5. Add proper error handling and logging

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

---

**Developed with ❤️ following modern React/Next.js best practices**