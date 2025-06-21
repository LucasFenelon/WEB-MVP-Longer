// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { useRouter } from 'next/navigation';
// import HomePage from '../../../app/home/page';

// // Mock Next.js router
// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// // Mock Image component
// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props: any) => {
//     // eslint-disable-next-line @next/next/no-img-element
//     return <img {...props} />;
//   },
// }));

// const mockPush = jest.fn();

// describe('HomePage', () => {
//   beforeEach(() => {
//     (useRouter as jest.Mock).mockReturnValue({
//       push: mockPush,
//     });
//     mockPush.mockClear();
//   });

//   test('renders home page with all main components', () => {
//     render(<HomePage />);
    
//     // Check weekly calendar
//     expect(screen.getByText('seg.')).toBeInTheDocument();
//     expect(screen.getByText('26')).toBeInTheDocument();
    
//     // Check DNA card
//     expect(screen.getByText('Agende seu exame de DNA')).toBeInTheDocument();
    
//     // Check nutrition card
//     expect(screen.getByText('🍎 Alimentação')).toBeInTheDocument();
//     expect(screen.getByText('kcal consumidas')).toBeInTheDocument();
//     expect(screen.getByText('kcal restantes')).toBeInTheDocument();
    
//     // Check exercise card
//     expect(screen.getByText('🧘 Exercícios')).toBeInTheDocument();
//     expect(screen.getByText('kcal queimadas')).toBeInTheDocument();
    
//     // Check sleep card
//     expect(screen.getByText('🛌 Sono')).toBeInTheDocument();
//     expect(screen.getByText('Tempo de cama')).toBeInTheDocument();
    
//     // Check header icons (help and calendar)
//     const headerButtons = screen.getAllByRole('button');
//     expect(headerButtons.length).toBeGreaterThanOrEqual(3); // help, calendar, and floating chat
//   });

//   test('renders weekly calendar with correct active state', () => {
//     render(<HomePage />);
    
//     const activeDay = screen.getByText('seg.').closest('.day-card');
//     const inactiveDay = screen.getByText('ter.').closest('.day-card');
    
//     expect(activeDay).toHaveClass('active');
//     expect(inactiveDay).not.toHaveClass('active');
//   });

//   test('handles floating chat button navigation', () => {
//     const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
//     render(<HomePage />);
    
//     const floatingChatButton = screen.getByRole('button', { name: /chat/i });
//     fireEvent.click(floatingChatButton);
    
//     expect(consoleSpy).toHaveBeenCalledWith('Opening chat page');
//     consoleSpy.mockRestore();
//   });

//   test('renders blue logo image centered', () => {
//     render(<HomePage />);
    
//     const logo = screen.getByAltText('Longer Logo');
//     expect(logo).toBeInTheDocument();
//     expect(logo).toHaveAttribute('src', '/images/home-logo-complete.svg');
//   });

//   test('renders user profile avatar', () => {
//     render(<HomePage />);
    
//     const avatar = screen.getByAltText('User Profile');
//     expect(avatar).toBeInTheDocument();
//     expect(avatar).toHaveAttribute('src', '/images/user-avatar.svg');
//   });

//   test('displays correct nutrition values', () => {
//     render(<HomePage />);
    
//     // Check for initial values
//     const consumedCalories = screen.getAllByText('0');
//     const remainingCalories = screen.getByText('1920');
    
//     expect(consumedCalories.length).toBeGreaterThan(0);
//     expect(remainingCalories).toBeInTheDocument();
//   });

//   test('progress bar should be at 0% when no calories consumed', () => {
//     render(<HomePage />);
    
//     const progressFill = document.querySelector('.progress-fill');
//     expect(progressFill).toHaveStyle('width: 0%');
//   });

//   test('calculates progress bar correctly for different calorie values', () => {
//     // Test progress calculation logic
//     const totalKcal = 1920;
    
//     // Test 0% progress
//     let consumed = 0;
//     let remaining = Math.max(totalKcal - consumed, 0);
//     let percentage = Math.min((consumed / totalKcal) * 100, 100);
//     expect(remaining).toBe(1920);
//     expect(percentage).toBe(0);
    
//     // Test 50% progress
//     consumed = 960;
//     remaining = Math.max(totalKcal - consumed, 0);
//     percentage = Math.min((consumed / totalKcal) * 100, 100);
//     expect(remaining).toBe(960);
//     expect(percentage).toBe(50);
    
//     // Test 100% progress
//     consumed = 1920;
//     remaining = Math.max(totalKcal - consumed, 0);
//     percentage = Math.min((consumed / totalKcal) * 100, 100);
//     expect(remaining).toBe(0);
//     expect(percentage).toBe(100);
    
//     // Test over 100% (should cap at 100%)
//     consumed = 2400;
//     remaining = Math.max(totalKcal - consumed, 0);
//     percentage = Math.min((consumed / totalKcal) * 100, 100);
//     expect(remaining).toBe(0);
//     expect(percentage).toBe(100);
//   });

//   test('renders header with help and calendar icons', () => {
//     render(<HomePage />);
    
//     const headerButtons = screen.getAllByRole('button');
//     // Should have help, calendar, and floating chat buttons
//     expect(headerButtons.length).toBe(3);
//   });

//   test('renders floating chat button', () => {
//     render(<HomePage />);
    
//     const floatingChatButton = screen.getByRole('button', { name: /chat/i });
//     expect(floatingChatButton).toBeInTheDocument();
//     expect(floatingChatButton).toHaveClass('chat-fab');
//   });
// }); 