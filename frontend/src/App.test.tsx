import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with navigation', () => {
  render(<App />);
  const headerElement = screen.getByText(/Доска объявлений/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders home page by default', () => {
  render(<App />);
  const homeTitle = screen.getByText(/Все объявления/i);
  expect(homeTitle).toBeInTheDocument();
});
