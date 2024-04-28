import React from 'react';
import { useForm } from 'react-hook-form';
import MyModal from '@/components/ui/Modal';
import { useState } from 'react';
import { FormInput } from '@/components/features/FormInput';
import LoadButton from '@/components/ui/ButtonLoading';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { SelectModal } from '@/components/ui/SelectModal';
import { toast } from 'sonner';

export const AddProductModal = ({ isOpen, closeModal, onSubmit }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    /**
     * The function gets called when the form is submitted
     * @param {Object} data
     */
    const submitForm = async (data) => {
        try {
            setIsLoading(true);
            if (onSubmit) {
                await onSubmit(data);
            }
        } catch (error) {
            toast('Error adding product:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MyModal isOpen={isOpen} closeModal={closeModal} title="">
            <div className="flex w-full justify-center">
                <HeaderModal closeModal={closeModal} title="Add new product" />
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="mt-3">
                <FormInput
                    labelName="Name"
                    icon="*"
                    validation={register('name', {
                        required: true,
                    })}
                    errMessaage="Enter valid product name"
                    error={errors.name}
                />
                <FormInput
                    labelName="image URL"
                    icon="*"
                    validation={register('image_url', {
                        required: true,
                    })}
                    errMessaage="Enter image url"
                    error={errors.image_url}
                />
                <FormInput
                    labelName="Description"
                    icon="*"
                    validation={register('description', {
                        required: true,
                    })}
                    errMessaage="Enter valid product description"
                    error={errors.description}
                />
                <div className="flex gap-2">
                    <FormInput
                        labelName="Price"
                        icon="*"
                        validation={register('price', {
                            required: true,
                            pattern: {
                                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                            },
                        })}
                        errMessaage="Price must be digits"
                        error={errors.price}
                    />
                    <FormInput
                        labelName="Quantity"
                        icon="*"
                        validation={register('quantity', {
                            required: true,
                            pattern: {
                                value: /^[0-9]+$/,
                            },
                        })}
                        errMessaage="Quantity must be digits and cannot be 0"
                        error={errors.quantity}
                    />
                </div>
                <SelectModal control={control} name="category" />
                <div className="mt-4">
                    <LoadButton
                        type="submit"
                        variant="primary"
                        title="Create Product"
                        size="sm"
                        fullWidth={true}
                        className="w-[100%] group relative flex items-center justify-center self-center rounded-md border border-transparent
             bg-blue-500 px-4 py-2 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        isLoading={isLoading}
                        loadingText="Please Wait..."
                    />
                </div>
            </form>
        </MyModal>
    );
};
