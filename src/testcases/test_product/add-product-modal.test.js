import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddProductModal } from './AddProductModal';

describe('AddProductModal Component', () => {
  const onSubmitMock = jest.fn();
  const closeModalMock = jest.fn();

  test('renders add product modal with form fields', async () => {
    const { getByLabelText, getByText } = render(
      <AddProductModal isOpen={true} closeModal={closeModalMock} onSubmit={onSubmitMock} />
    );

    expect(getByText('Add new product')).toBeInTheDocument();
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('image URL')).toBeInTheDocument();
    expect(getByLabelText('Description')).toBeInTheDocument();
    expect(getByLabelText('Price')).toBeInTheDocument();
    expect(getByLabelText('Quantity')).toBeInTheDocument();
    expect(getByText('Category')).toBeInTheDocument();
    expect(getByText('Create Product')).toBeInTheDocument();
  });

  test('calls onSubmit function when form is submitted', async () => {
    const { getByLabelText, getByText } = render(
      <AddProductModal isOpen={true} closeModal={closeModalMock} onSubmit={onSubmitMock} />
    );

    fireEvent.input(getByLabelText('Name'), { target: { value: 'Sample Product' } });
    fireEvent.input(getByLabelText('image URL'), { target: { value: 'sample-image.jpg' } });
    fireEvent.input(getByLabelText('Description'), { target: { value: 'Sample Description' } });
    fireEvent.input(getByLabelText('Price'), { target: { value: '50.99' } });
    fireEvent.input(getByLabelText('Quantity'), { target: { value: '10' } });

    fireEvent.click(getByText('Create Product'));

    // Wait for the asynchronous onSubmit to complete
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'Sample Product',
        image_url: 'sample-image.jpg',
        description: 'Sample Description',
        price: '50.99',
        quantity: '10',
        category: undefined, // Assuming SelectModal returns undefined when no category is selected
      });
    });
  });

  test('calls closeModal function when close button is clicked', () => {
    const { getByText } = render(
      <AddProductModal isOpen={true} closeModal={closeModalMock} onSubmit={onSubmitMock} />
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });
});
