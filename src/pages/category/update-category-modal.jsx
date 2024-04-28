import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import MyModal from '@/components/ui/Modal';
import { FormInput } from '@/components/features/FormInput';
import LoadButton from '@/components/ui/ButtonLoading';
import { HeaderModal } from '@/components/ui/HeaderModal';


export const UpdateCategoryModal = ({
    isOpen,
    closeModal,
    onSubmit,
    initialFormValues,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: initialFormValues });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Use useEffect to update form values when initialFormValues change
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
                <HeaderModal closeModal={closeModal} title="Upadate category" />
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
                        title="Update category"
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
