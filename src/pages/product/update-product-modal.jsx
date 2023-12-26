import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import MyModal from '@/components/ui/Modal';
import { FormInput } from '@/components/features/FormInput';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { useNavigate } from 'react-router-dom';
import { SelectModal } from '@/components/ui/SelectModal';

export const UpdateProductModal = ({
    isOpen,
    closeModal,
    onSubmit,
    initialFormValues,
    spinner
}) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: initialFormValues });

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
            await onSubmit(data);
            reset();
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
                    <ButtonModal title="Update Product" />
                </div>
                {spinner}
            </form>
        </MyModal>
    );
};
