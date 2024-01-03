import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DeleteProductModal } from './DeleteProductModal';

describe('DeleteProductModal Component', () => {
  const onConfirmMock = jest.fn();
  const closeModalMock = jest.fn();

  test('renders delete product modal with appropriate content', async () => {
    const { getByText } = render(
      <DeleteProductModal isOpen={true} closeModal={closeModalMock} onConfirm={onConfirmMock} />
    );

    expect(getByText('Product deleted cannot be restored')).toBeInTheDocument();
    expect(getByText('The selected product will be deleted')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
  });

  test('calls onConfirm function when "Delete" button is clicked', async () => {
    const { getByText } = render(
      <DeleteProductModal isOpen={true} closeModal={closeModalMock} onConfirm={onConfirmMock} />
    );

    fireEvent.click(getByText('Delete'));

    // Wait for the asynchronous onConfirm to complete
    await waitFor(() => {
      expect(onConfirmMock).toHaveBeenCalledTimes(1);
    });
  });

  test('calls closeModal function when "Cancel" button is clicked', () => {
    const { getByText } = render(
      <DeleteProductModal isOpen={true} closeModal={closeModalMock} onConfirm={onConfirmMock} />
    );

    fireEvent.click(getByText('Cancel'));

    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });
});
