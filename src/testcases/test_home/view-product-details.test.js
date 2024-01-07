import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewProduct } from './ViewProduct';

describe('ViewProduct Component', () => {
  const item = {
    name: 'Sample Product',
    image_url: 'sample-image.jpg',
    price: 100,
    description: 'This is a sample product description.',
    seller: 'Sample Seller',
    phone: '123-456-7890',
    address: '123 Main St',
  };

  test('renders view product modal with product details', () => {
    const { getByText, getByAltText } = render(
      <ViewProduct isOpen={true} closeModal={() => {}} item={item} />
    );

    expect(getByText('Product Details')).toBeInTheDocument();
    expect(getByText('Sample Product')).toBeInTheDocument();
    expect(getByAltText('Sample Product')).toBeInTheDocument();
    expect(getByText('Category A')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
    expect(getByText('Product Description')).toBeInTheDocument();
    expect(getByText('This is a sample product description.')).toBeInTheDocument();
    expect(getByText('Seller Information')).toBeInTheDocument();
    expect(getByText('Sample Seller')).toBeInTheDocument();
    expect(getByText('123-456-7890')).toBeInTheDocument();
    expect(getByText('123 Main St')).toBeInTheDocument();
  });

  test('calls closeModal function when close button is clicked', () => {
    const closeModalMock = jest.fn();
    const { getByText } = render(
      <ViewProduct isOpen={true} closeModal={closeModalMock} item={item} />
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });
});
