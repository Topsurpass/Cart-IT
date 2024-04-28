import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import MyModal from '@/components/ui/Modal';
import { FormInput } from '@/components/features/FormInput';
import { HeaderModal } from '@/components/ui/HeaderModal';
import LoadButton from '@/components/ui/ButtonLoading';
import { SelectModal } from '@/components/ui/SelectModal';

export const UpdateProductModal = ({
    isOpen,
    closeModal,
    onSubmit,
    initialFormValues,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: initialFormValues });

    const [isLoading, setIsLoading] = useState(false);
    /**
     * Use useEffect to update form values when initialFormValues change
     */
    useEffect(() => {
        if (initialFormValues) {
            Object.entries(initialFormValues).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [initialFormValues, setValue]);

    const submitForm = async (data) => {
        if (onSubmit) {
            try {
                setIsLoading(true);
                // Make  API call for adding new product N.B onAdd is an async fxn append await to it
                await onSubmit(data);
                reset();
            } catch (error) {
                // Handle API submission error
                toast('Error adding category:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <MyModal isOpen={isOpen} closeModal={closeModal} title="">
            <div className="flex w-full justify-center">
                <HeaderModal closeModal={closeModal} title="Upadate product" />
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
                                value: /^[1-9]+$/,
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
                        title="Update product"
                        size="sm"
                        fullWidth={true}
                        className=" `w-[100%] group relative flex items-center justify-center self-center rounded-md border border-transparent
             bg-blue-500 px-4 py-2 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        isLoading={isLoading}
                        loadingText="Updating..."
                    />
                </div>
            </form>
        </MyModal>
    );
};
