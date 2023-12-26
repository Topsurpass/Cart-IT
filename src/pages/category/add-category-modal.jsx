import React from 'react';
import { useForm } from 'react-hook-form';
import MyModal from '@/components/ui/Modal';
import { FormInput } from '@/components/features/FormInput';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { HeaderModal } from '@/components/ui/HeaderModal';



export const AddCategoryModal = ({
    isOpen,
    closeModal,
    onSubmit,
    spinner
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    

    /**
     * The function gets called when the submit button is clicked
     * @param {Object} data 
     */
    const submitForm = async (data) => {
        if (onSubmit) {
            await onSubmit(data);
        }
    };

    return (
        <MyModal isOpen={isOpen} closeModal={closeModal} title="">
            <div className="flex w-full justify-center">
                <HeaderModal
                    closeModal={closeModal}
                    title="Add new category"
                />
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
                    <ButtonModal title="Create Category" />
                </div>
            </form>
           {spinner}
        </MyModal>
    );
};
