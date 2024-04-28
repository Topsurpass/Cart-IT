import { useForm } from 'react-hook-form';
import MyModal from '@/components/ui/Modal';
import LoadButton from '@/components/ui/ButtonLoading';
import { FormInput } from '@/components/features/FormInput';
import { toast } from 'sonner';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiBaseUrl from '@/api/baseUrl';

export const RegisterModal = ({ isOpen, closeModal, nowLogin, onSignin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const homePage = () => navigate('/');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    /**
     * Make API call to the server to register new merchant or user
     * @param {Object} formData
     */
    const submitForm = (formData) => {
        const requestData = {
            merchant: formData.merchant,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
        };
        setIsLoading(true);
        setError('');
        axios
            .post(`${apiBaseUrl}/auth/signup`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                reset();
                closeModal();
                nowLogin();
                toast('Account created successfully.');
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
        <MyModal isOpen={isOpen} closeModal={closeModal}>
            <div className="flex w-full flex-col justify-center">
                <HeaderModal
                    closeModal={closeModal}
                    title="Create an account to list your own Products"
                />
                <form onSubmit={handleSubmit(submitForm)} className="mt-3">
                    <FormInput
                        labelName="Full Name"
                        icon="*"
                        validation={register('fullname', {
                            required: true,
                        })}
                        errMessaage="Full name is required"
                        error={errors.fullname}
                    />
                    <FormInput
                        labelName="Email Address"
                        type="email"
                        icon="*"
                        validation={register('email', {
                            required: true,
                        })}
                        errMessaage="Email is required"
                        error={errors.email}
                    />
                    <FormInput
                        labelName="Merchant"
                        icon="*"
                        validation={register('merchant', {
                            required: true,
                            pattern: {
                                value: /^[A-Za-z\s]{6,}$/i,
                            },
                            maxLength: 30,
                        })}
                        errMessaage="Minimum of 6 and max of 30 letters"
                        error={errors.merchant}
                    />
                    <FormInput
                        labelName="Username"
                        icon="*"
                        validation={register('username', {
                            required: true,
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                            },
                            maxLength: 15,
                        })}
                        errMessaage="Max length of 15 with 1 digit no special character"
                        error={errors.username}
                    />
                    <FormInput
                        type="password"
                        labelName="Password"
                        icon="*"
                        validation={register('password', {
                            required: true,
                            pattern:
                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        })}
                        errMessaage="Minimum of 8 characters (1 digit, 1 special character, 1 uppercase and lowercase)"
                        error={errors.password}
                    />

                    <FormInput
                        labelName="Phone"
                        icon="*"
                        placeholder="08012345678"
                        validation={register('phone', {
                            required: true,
                            pattern: {
                                value: /^\d{11}$/,
                            },
                        })}
                        errMessaage="Must be 11 digits"
                        error={errors.phone}
                    />

                    <FormInput
                        labelName="Address"
                        icon="*"
                        validation={register('address', {
                            required: true,
                            pattern: {
                                value: /^[A-Za-z0-9\s\.,#-]{10,}$/,
                            },
                        })}
                        errMessaage="Minimum of 10 characters"
                        error={errors.address}
                    />
                    <p className="text-sm text-red-500">{error}</p>
                    <div className="mt-4">
                        <LoadButton
                            type="submit"
                            variant="primary"
                            title="Create Account"
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
                    <p className="mt-3 text-center text-sm" onClick={onSignin}>
                        Already have an account ?{' '}
                        <span
                            href="#"
                            className="text-bold cursor-pointer text-blue-500"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </MyModal>
    );
};
