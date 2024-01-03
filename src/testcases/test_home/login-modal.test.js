import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { LoginModal } from './LoginModal';

// Mock Axios to simulate API calls
jest.mock('axios');

describe('LoginModal Component', () => {
  test('renders login modal with default content', () => {
    const { getByText, getByLabelText } = render(<LoginModal isOpen={true} closeModal={() => {}} />);
    expect(getByText('Login to manage your products')).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText("Don't have an account ? Sign Up")).toBeInTheDocument();
  });

  test('submits the login form with valid data', async () => {
    const { getByLabelText, getByText } = render(<LoginModal isOpen={true} closeModal={() => {}} />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Mock Axios.post to resolve successfully
    axios.post.mockResolvedValueOnce({
      data: { message: 'Login successful' },
    });

    fireEvent.click(loginButton);

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/v1/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Assertions after successful login
    expect(getByText('Login successful')).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toHaveValue('');
    expect(getByLabelText('Password')).toHaveValue('');
  });

  test('handles API error on login', async () => {
    const { getByLabelText, getByText } = render(<LoginModal isOpen={true} closeModal={() => {}} />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Mock Axios.post to reject with an error
    axios.post.mockRejectedValueOnce({
      message: 'Invalid credentials',
    });

    fireEvent.click(loginButton);

    // Wait for the API call to reject
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/v1/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Assertions after handling API error
    expect(getByText('Invalid credentials')).toBeInTheDocument();
  });

  test('redirects to dashboard after successful login', async () => {
    const closeModalMock = jest.fn();
    const { getByLabelText, getByText } = render(<LoginModal isOpen={true} closeModal={closeModalMock} />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Mock Axios.post to resolve successfully
    axios.post.mockResolvedValueOnce({
      data: { message: 'Login successful' },
    });

    fireEvent.click(loginButton);

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/v1/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Assertions after successful login
    expect(closeModalMock).toHaveBeenCalled();
  });

  test('handles API error and redirects to home page on login', async () => {
    const closeModalMock = jest.fn();
    const { getByLabelText, getByText } = render(<LoginModal isOpen={true} closeModal={closeModalMock} />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Mock Axios.post to reject with an error
    axios.post.mockRejectedValueOnce({
      message: 'Invalid credentials',
    });

    fireEvent.click(loginButton);

    // Wait for the API call to reject
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/v1/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Assertions after handling API error
    expect(closeModalMock).not.toHaveBeenCalled();
  });
});
