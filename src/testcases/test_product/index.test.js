import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { ProductPage } from './ProductPage';

jest.mock('axios');

describe('ProductPage Component', () => {
  test('renders product page with table and modals', async () => {
    // Mock the Axios response for fetching products
    axios.get.mockResolvedValue({ data: [{ name: 'Product 1', description: 'Description 1', category: 'Category 1', price: 20, quantity: 10 }] });

    const { getByText, queryByText, getByRole } = render(<ProductPage />);

    // Wait for the table to load
    await waitFor(() => {
      expect(getByText('Product 1')).toBeInTheDocument();
      expect(getByText('Description 1')).toBeInTheDocument();
      expect(getByText('Category 1')).toBeInTheDocument();
      expect(getByText('$20')).toBeInTheDocument();
      expect(getByText('10')).toBeInTheDocument();
    });

    // Click on the "Add New Product" button
    fireEvent.click(getByText('Add New Product'));

    // Check if the Add Product modal is rendered
    expect(getByText('Add new product')).toBeInTheDocument();

    // Fill and submit the Add Product form (you may need to customize this based on your form structure)
    fireEvent.change(getByLabelText('Name'), { target: { value: 'New Product' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'New Description' } });
    fireEvent.change(getByLabelText('Price'), { target: { value: '30' } });
    fireEvent.change(getByLabelText('Quantity'), { target: { value: '5' } });

    fireEvent.click(getByText('Create Product'));

    // Mock the Axios response for adding a new product
    axios.post.mockResolvedValue({ data: { message: 'Product added successfully' } });

    // Wait for the asynchronous action to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/v1/product/new', {
        name: 'New Product',
        description: 'New Description',
        category: undefined, // Update based on your actual form data
        price: '30',
        quantity: '5',
      }, { withCredentials: true });
      expect(getByText('Product added successfully')).toBeInTheDocument();
    });
  });
});
