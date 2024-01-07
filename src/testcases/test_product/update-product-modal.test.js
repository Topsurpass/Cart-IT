import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UpdateProductModal } from './UpdateProductModal';

describe('UpdateProductModal Component', () => {
  test('renders update product modal and submits form', async () => {
    const initialFormValues = {
      name: 'Product 1',
      image_url: 'https://example.com/image.jpg',
      description: 'Description 1',
      price: '20.99',
      quantity: '5',
      category: 'Category 1',
    };

    const onSubmitMock = jest.fn();

    const { getByLabelText, getByText, queryByText } = render(
      <UpdateProductModal
        isOpen={true}
        closeModal={() => {}}
        onSubmit={onSubmitMock}
        initialFormValues={initialFormValues}
        spinner={null}
      />
    );

    // Check if the form is rendered with initial values
    expect(getByLabelText('Name')).toHaveValue('Product 1');
    expect(getByLabelText('image URL')).toHaveValue('https://example.com/image.jpg');
    expect(getByLabelText('Description')).toHaveValue('Description 1');
    expect(getByLabelText('Price')).toHaveValue('20.99');
    expect(getByLabelText('Quantity')).toHaveValue('5');

    // Update form values
    fireEvent.change(getByLabelText('Name'), { target: { value: 'Updated Product' } });
    fireEvent.change(getByLabelText('Price'), { target: { value: '30.50' } });

    // Submit form
    fireEvent.click(getByText('Update Product'));

    // Check if the onSubmit function is called with updated data
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'Updated Product',
        image_url: 'https://example.com/image.jpg',
        description: 'Description 1',
        price: '30.50',
        quantity: '5',
        category: 'Category 1',
      });
    });

    // Check if the form is reset after submission
    expect(getByLabelText('Name')).toHaveValue(''); // Reset to an empty string
    expect(getByLabelText('Price')).toHaveValue(''); // Reset to an empty string
  });
});
