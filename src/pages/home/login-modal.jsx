import { useForm } from 'react-hook-form';
import MyModal from '@/components/ui/Modal';
import LoadButton from '@/components/ui/ButtonLoading';
import { FormInput } from '@/components/features/FormInput';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import apiBaseUrl from '@/api/baseUrl';

export const LoginModal = ({ isOpen, closeModal, onSignup }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
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
        setError('');
        axios
            .post(`${apiBaseUrl}/auth/login`, requestData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                closeModal();
                reset();
                dashboardPage();
                toast('Sign in successfully.');
            })
            .catch((error) => {
                setError(error.response.data.message);
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
                <p className='text-red-500 text-sm'>{error}</p>
                <div className="mt-4">
                    <LoadButton
                        type="submit"
                        variant="primary"
                        title="Log in"
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
            <p className="mt-3 text-center text-sm" onClick={onSignup}>
                Don't have an account ?{' '}
                <span className="text-bold cursor-pointer text-blue-500">
                    Sign Up
                </span>
            </p>
        </MyModal>
    );
};
