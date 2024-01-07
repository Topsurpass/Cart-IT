import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { CategoryPage } from './CategoryPage';

// Mock Axios to simulate API calls
jest.mock('axios');

describe('CategoryPage Component', () => {
  test('renders category page with loading state', () => {
    const { getByText } = render(<CategoryPage />);
    expect(getByText('Manage Category')).toBeInTheDocument();
    expect(getByText('Add New Category')).toBeInTheDocument();
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('renders category page with data', async () => {
    // Mock Axios response for successful API call
    axios.get.mockResolvedValue({ data: [{ name: 'Category1', description: 'Description1' }] });

    const { getByText, queryByText } = render(<CategoryPage />);
    // Wait for the API call to complete
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    expect(getByText('Manage Category')).toBeInTheDocument();
    expect(getByText('Add New Category')).toBeInTheDocument();
    expect(queryByText('Loading...')).toBeNull(); // Loading message should be gone
    expect(getByText('Category1')).toBeInTheDocument();
    expect(getByText('Description1')).toBeInTheDocument();
  });

  test('opens add modal when add button is clicked', () => {
    const { getByText } = render(<CategoryPage />);
    fireEvent.click(getByText('Add New Category'));
    expect(getByText('Add new category')).toBeInTheDocument();
  });

  // Similar tests can be written for update and delete modals
});
