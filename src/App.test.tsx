import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CalculatorForm component', () => {
  render(<App />);

  const formHeading = screen.getByText(/Delivery Fee Calculator/i);
  expect(formHeading).toBeInTheDocument();
});