import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HomePage } from './HomePage';
import axios from 'axios';

// Mock Axios to simulate API calls
jest.mock('axios');

describe('HomePage Component', () => {
  test('renders home page with default content', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('Explore exciting products')).toBeInTheDocument();
  });

  test('opens login modal when login button is clicked', () => {
    const { getByText, getByTestId } = render(<HomePage />);
    const loginButton = getByText('Login');

    fireEvent.click(loginButton);

    expect(getByTestId('login-modal')).toBeInTheDocument();
  });

  test('opens register modal when register button is clicked', () => {
    const { getByText, getByTestId } = render(<HomePage />);
    const registerButton = getByText('Register');

    fireEvent.click(registerButton);

    expect(getByTestId('register-modal')).toBeInTheDocument();
  });

  test('selects an item when clicked', () => {
    const { getByAltText, getByText, getByTestId } = render(<HomePage />);
    const productImage = getByAltText('Product Title 1');

    fireEvent.click(productImage);

    expect(getByText('Product Title 1')).toBeInTheDocument();
    expect(getByTestId('view-product-modal')).toBeInTheDocument();
  });
});
