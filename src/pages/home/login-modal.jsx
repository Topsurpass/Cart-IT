import React from 'react';
import MyModal from '@/components/ui/Modal';
import { useForm } from 'react-hook-form';
import { FormInput } from '@/components/features/FormInput';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { HeaderModal } from '@/components/ui/HeaderModal';

export const LoginModal = ({ isOpen, closeModal }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const submitForm = () => {
        alert('Registered');
        reset();
        closeModal();
    };
    return (
        <>
            <MyModal isOpen={isOpen} closeModal={closeModal} title="">
                <div className="flex w-full justify-center">
                    <HeaderModal
                        closeModal={closeModal}
                        title="Login to manage your products"
                    />
                </div>

                <form onSubmit={handleSubmit(submitForm)} className="mt-3">
                    <FormInput
                        labelName="Email Address"
                        type="email"
                        validation={register('email', {
                            required: true,
                        })}
                        errMessaage="Invalid email address"
                        error={errors.email}
                    />
                    <FormInput
                        labelName="Password"
                        type="password"
                        validation={register('password', {
                            required: true,
                        })}
                        errMessaage="Enter your password"
                        error={errors.password}
                    />
                    <div className="mt-4">
                        <ButtonModal title="Login" />
                    </div>
                </form>
                <p className="mt-3 text-center text-sm">
                    Don't have an account ?{' '}
                    <a href="#" className="text-bold text-blue-500">
                        Sign Up
                    </a>
                </p>
            </MyModal>
        </>
    );
};
