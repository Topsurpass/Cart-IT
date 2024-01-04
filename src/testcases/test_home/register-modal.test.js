import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { RegisterModal } from './RegisterModal';

// Mock Axios to simulate API calls
jest.mock('axios');

describe('RegisterModal Component', () => {
  test('renders register modal with default content', () => {
    const { getByLabelText, getByText } = render(
      <RegisterModal isOpen={true} closeModal={() => {}} nowLogin={() => {}} />
    );
    expect(getByLabelText('Full Name')).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Merchant')).toBeInTheDocument();
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Phone')).toBeInTheDocument();
    expect(getByLabelText('Address')).toBeInTheDocument();
    expect(getByText('Create Account')).toBeInTheDocument();
    expect(getByText("Already have an account ? Login")).toBeInTheDocument();
  });

  test('submits the registration form with valid data', async () => {
    const { getByLabelText, getByText } = render(
      <RegisterModal isOpen={true} closeModal={() => {}} nowLogin={() => {}} />
    );
    const fullNameInput = getByLabelText('Full Name');
    const emailInput = getByLabelText('Email Address');
    const merchantInput = getByLabelText('Merchant');
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const phoneInput = getByLabelText('Phone');
    const addressInput = getByLabelText('Address');
    const createAccountButton = getByText('Create Account');

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(merchantInput, { target: { value: 'MyStore' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe123' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(phoneInput, { target: { value: '08012345678' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    // Mock Axios.post to resolve successfully
    axios.post.mockResolvedValueOnce({
      data: { message: 'Registration successful' },
    });

    fireEvent.click(createAccountButton);

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/v1/auth/signup', {
        merchant: 'MyStore',
        email: 'john.doe@example.com',
        username: 'johndoe123',
        password: 'Password123!',
        phone: '08012345678',
        address: '123 Main St',
      });
    });

    // Assertions after successful registration
    expect(getByText('Registration successful')).toBeInTheDocument();
    // Reset input fields
    expect(fullNameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(merchantInput).toHaveValue('');
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(phoneInput).toHaveValue('');
    expect(addressInput).toHaveValue('');
  });

  test('handles API error on registration', async () => {
    const { getByLabelText, getByText } = render(
      <RegisterModal isOpen={true} closeModal={() => {}} nowLogin={() => {}} />
    );
    const createAccountButton = getByText('Create Account');

    // Mock Axios.post to reject with an error
    axios.post.mockRejectedValueOnce({
      message: 'Registration failed',
    });

    fireEvent.click(createAccountButton);

    // Wait for the API call to reject
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/v1/auth/signup', {
        merchant: undefined,
        email: undefined,
        username: undefined,
        password: undefined,
        phone: undefined,
        address: undefined,
      });
    });

    // Assertions after handling API error
    expect(getByText('Registration failed')).toBeInTheDocument();
  });

  test('redirects to login page after successful registration', async () => {
    const nowLoginMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <RegisterModal isOpen={true} closeModal={() => {}} nowLogin={nowLoginMock} />
    );
    const createAccountButton = getByText('Create Account');

    // Mock Axios.post to resolve successfully
    axios.post.mockResolvedValueOnce({
      data: { message: 'Registration successful' },
    });

    fireEvent.click(createAccountButton);

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/v1/auth/signup', {
        merchant: undefined,
        email: undefined,
        username: undefined,
        password: undefined,
        phone: undefined,
        address: undefined,
      });
    });

    // Assertions after successful registration
    expect(nowLoginMock).toHaveBeenCalled();
  });
});
