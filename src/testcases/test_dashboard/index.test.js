import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { Dashboard } from './Dashboard';

// Mock Axios to simulate API calls
jest.mock('axios');

describe('Dashboard Component', () => {
  test('renders dashboard with loading state', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('renders dashboard with catalog products', async () => {
    // Mock Axios response for successful API call
    const mockData = [
      { _id: { $oid: '1' }, name: 'Product1', price: 10, image_url: 'image1.jpg' },
      { _id: { $oid: '2' }, name: 'Product2', price: 20, image_url: 'image2.jpg' },
    ];
    axios.get.mockResolvedValue({ data: mockData });

    const { getByText, getByAltText } = render(<Dashboard />);
    // Wait for the API call to complete
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByAltText('Product1')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByAltText('Product2')).toBeInTheDocument();
    expect(getByText('$20')).toBeInTheDocument();
  });

  test('opens ViewProduct modal when a product is clicked', async () => {
    const mockData = [{ _id: { $oid: '1' }, name: 'Product1', price: 10, image_url: 'image1.jpg' }];
    axios.get.mockResolvedValue({ data: mockData });

    const { getByText, getByAltText, getByTestId } = render(<Dashboard />);
    // Wait for the API call to complete
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    const productImage = getByAltText('Product1');
    fireEvent.click(productImage);

    // Wait for the modal to open
    await waitFor(() => expect(getByTestId('view-product-modal')).toBeInTheDocument());
  });
});
