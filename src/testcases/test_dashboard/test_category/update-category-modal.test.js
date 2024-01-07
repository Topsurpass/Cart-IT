import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UpdateCategoryModal } from './UpdateCategoryModal';

describe('UpdateCategoryModal Component', () => {
  test('renders update category modal with initial form values', () => {
    const initialFormValues = {
      name: 'CategoryName',
      description: 'CategoryDescription',
    };

    const { getByLabelText } = render(
      <UpdateCategoryModal
        isOpen={true}
        closeModal={() => {}}
        onSubmit={() => {}}
        initialFormValues={initialFormValues}
        spinner={null}
      />
    );

    expect(getByLabelText('Name')).toHaveValue('CategoryName');
    expect(getByLabelText('Description')).toHaveValue('CategoryDescription');
  });

  test('calls onSubmit when update button is clicked', async () => {
    const onSubmitMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <UpdateCategoryModal
        isOpen={true}
        closeModal={() => {}}
        onSubmit={onSubmitMock}
        initialFormValues={{}}
        spinner={null}
      />
    );

    const nameInput = getByLabelText('Name');
    const descriptionInput = getByLabelText('Description');
    const updateButton = getByText('Update category');

    fireEvent.change(nameInput, { target: { value: 'UpdatedName' } });
    fireEvent.change(descriptionInput, { target: { value: 'UpdatedDescription' } });

    fireEvent.click(updateButton);

    // Wait for the asynchronous onSubmit to be called
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'UpdatedName',
        description: 'UpdatedDescription',
      });
    });
  });

  test('closes modal when closed', () => {
    const closeModalMock = jest.fn();
    const { getByText } = render(
      <UpdateCategoryModal
        isOpen={true}
        closeModal={closeModalMock}
        onSubmit={() => {}}
        initialFormValues={{}}
        spinner={null}
      />
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(closeModalMock).toHaveBeenCalled();
  });
});
