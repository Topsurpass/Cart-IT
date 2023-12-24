import React from 'react';
import { useForm } from 'react-hook-form';
import MyModal from '@/components/ui/Modal';
import { FormInput } from '@/components/features/FormInput';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { useNavigate } from 'react-router-dom';



export const AddCategoryModal = ({
    isOpen,
    closeModal,
    onSubmit,
    spinner
}) => {
    const navigate = useNavigate();
    const categoryPage = () => navigate('/dashboard/category');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    

    const submitForm = async (data) => {
        if (onSubmit) {
            try {
                // Make  API call for adding new product N.B onAdd is an async fxn append await to it
                await onSubmit(data);
                categoryPage();
            } catch (error) {
                // Handle API submission error
                console.error('Error adding product:', error);
            }
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
