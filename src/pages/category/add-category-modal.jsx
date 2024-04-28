import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MyModal from '@/components/ui/Modal';
import { FormInput } from '@/components/features/FormInput';
import LoadButton from '@/components/ui/ButtonLoading';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { toast } from 'sonner';

export const AddCategoryModal = ({ isOpen, closeModal, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    /**
     * The function gets called when the submit button is clicked
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
                <HeaderModal closeModal={closeModal} title="Add new category" />
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="mt-3">
                <FormInput
                    labelName="Name"
                    icon="*"
                    validation={register('name', {
                        required: true,
                    })}
                    errMessaage="Enter category name"
                    error={errors.name}
                />
                <FormInput
                    labelName="Description"
                    icon="*"
                    validation={register('description', {
                        required: true,
                    })}
                    errMessaage="Describe your category"
                    error={errors.description}
                />
                <div className="mt-4">
                    <LoadButton
                        type="submit"
                        variant="primary"
                        title="Create Category"
                        size="sm"
                        fullWidth={true}
                        className=" `w-[100%] group relative flex items-center justify-center self-center rounded-md border border-transparent
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
