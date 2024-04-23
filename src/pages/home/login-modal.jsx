import React from 'react';
import { useForm } from 'react-hook-form';
import MyModal from '@/components/ui/Modal';
import { FormInput } from '@/components/features/FormInput';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '@/components/ui/Spinner';
import axios from 'axios';
import apiBaseUrl from '@/api/baseUrl';


export const LoginModal = ({ isOpen, closeModal, onSignup }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dashboardPage = () => navigate('/dashboard');
    const homePage = () => navigate('/');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // This calls the API for user login authentication
    const submitForm = async (formData) => {
        const requestData = {
            email: formData.email,
            password: formData.password,
        };
        setIsLoading(true);
        axios
            .post(`${apiBaseUrl}/auth/login`, requestData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                alert(response.data.message);
                closeModal();
                reset();
                dashboardPage();
            })
            .catch((error) => {
                alert(error.response.data.message);
                homePage();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
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
            <p className="mt-3 text-center text-sm" onClick={onSignup}>
                Don't have an account ?{' '}
                <span className="text-bold cursor-pointer text-blue-500">
                    Sign Up
                </span>
            </p>
            {isLoading && <Spinner />}
        </MyModal>
    );
};
