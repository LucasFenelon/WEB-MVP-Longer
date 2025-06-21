// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { useRouter } from 'next/navigation';
// import PricingPage from '../../../app/pricing/page';

// // Mock Next.js router
// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// // Mock logger
// jest.mock('../../../utils/logger', () => ({
//   Logger: {
//     info: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// describe('PricingPage', () => {
//   const mockPush = jest.fn();
//   const mockBack = jest.fn();

//   beforeEach(() => {
//     (useRouter as jest.Mock).mockReturnValue({
//       push: mockPush,
//       back: mockBack,
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders pricing page with header and features', () => {
//     render(<PricingPage />);
    
//     expect(screen.getByText('Nossos planos')).toBeInTheDocument();
//     expect(screen.getByText('Entenda todo o potencial da Longer na sua saúde e longevidade')).toBeInTheDocument();
//     expect(screen.getByText('Essencial')).toBeInTheDocument();
//     expect(screen.getByText('Premium')).toBeInTheDocument();
//   });

//   it('displays pricing information correctly', () => {
//     render(<PricingPage />);
    
//     const installmentTexts = screen.getAllByText('12x');
//     expect(installmentTexts).toHaveLength(2);
//     expect(screen.getByText('29,90')).toBeInTheDocument();
//     expect(screen.getByText('129,90')).toBeInTheDocument();
//   });

//   it('shows all features in the comparison table', () => {
//     render(<PricingPage />);
    
//     expect(screen.getByText('Assistente de AI')).toBeInTheDocument();
//     expect(screen.getByText('Dietas personalizadas')).toBeInTheDocument();
//     expect(screen.getByText('Exame de DNA')).toBeInTheDocument();
//     expect(screen.getByText('+ R$59,90 ao mês')).toBeInTheDocument();
//     expect(screen.getByText('+ R$39,00')).toBeInTheDocument();
//   });

//   it('handles close button click', () => {
//     render(<PricingPage />);
    
//     const closeButton = screen.getByRole('button');
//     fireEvent.click(closeButton);
    
//     expect(mockBack).toHaveBeenCalledTimes(1);
//   });

//   it('displays check and x icons correctly', () => {
//     render(<PricingPage />);
    
//     const checkIcons = screen.getAllByText('✓');
//     const xIcons = screen.getAllByText('✕');
    
//     expect(checkIcons.length).toBeGreaterThan(0);
//     expect(xIcons.length).toBeGreaterThan(0);
//   });
// }); 