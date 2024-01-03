import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddCategoryModal } from './AddCategoryModal';

describe('AddCategoryModal Component', () => {
  test('renders modal with title', () => {
    const { getByText } = render(<AddCategoryModal isOpen={true} closeModal={() => {}} onSubmit={() => {}} spinner={null} />);
    expect(getByText('Add new category')).toBeInTheDocument();
  });

  test('calls onSubmit with form data when submitted', async () => {
    const onSubmitMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <AddCategoryModal isOpen={true} closeModal={() => {}} onSubmit={onSubmitMock} spinner={null} />
    );

    const nameInput = getByLabelText('Name');
    const descriptionInput = getByLabelText('Description');
    const submitButton = getByText('Create Category');

    fireEvent.change(nameInput, { target: { value: 'Test Category' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    fireEvent.click(submitButton);

    // Wait for the asynchronous onSubmit to be called
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'Test Category',
        description: 'Test Description',
      });
    });
  });
});
