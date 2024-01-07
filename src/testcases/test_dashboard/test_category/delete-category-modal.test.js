import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DeleteCategoryModal } from './DeleteCategoryModal';

describe('DeleteCategoryModal Component', () => {
  test('renders modal with title and content', () => {
    const { getByText } = render(
      <DeleteCategoryModal isOpen={true} closeModal={() => {}} onConfirm={() => {}} spinner={null} />
    );
    expect(getByText('Product deleted cannot be restored')).toBeInTheDocument();
    expect(getByText('This category and all its products will be deleted')).toBeInTheDocument();
  });

  test('calls onConfirm when delete button is clicked', async () => {
    const onConfirmMock = jest.fn();
    const { getByText } = render(
      <DeleteCategoryModal isOpen={true} closeModal={() => {}} onConfirm={onConfirmMock} spinner={null} />
    );

    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    // Wait for the asynchronous onConfirm to be called
    await waitFor(() => {
      expect(onConfirmMock).toHaveBeenCalled();
    });
  });

  test('calls closeModal when cancel button is clicked', () => {
    const closeModalMock = jest.fn();
    const { getByText } = render(
      <DeleteCategoryModal isOpen={true} closeModal={closeModalMock} onConfirm={() => {}} spinner={null} />
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(closeModalMock).toHaveBeenCalled();
  });
});