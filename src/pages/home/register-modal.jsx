import { useForm } from 'react-hook-form';
import MyModal from '@/components/ui/Modal';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { FormInput } from '@/components/features/FormInput';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { useState } from 'react';
import axios from 'axios';
import Spinner from '@/components/ui/Spinner';
import { useNavigate } from 'react-router-dom';

export const RegisterModal = ({ isOpen, closeModal, nowLogin, onSignin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const homePage = () => navigate('/');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    //  Api call to register new merchant
    const submitForm = (formData) => {
        // const requestData = {
        //     merchant: formData.merchant,
        //     email: formData.email,
        //     username: formData.username,
        //     password: formData.password,
        //     phone: formData.phone,
        //     address: formData.address,
        // };
        // setIsLoading(true);
        // axios
        //     .post('http://localhost:5000/api/v1/auth/signup', requestData, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     })
        //     .then((response) => {
        //         alert(response.data.message);
        //         reset();
        //         closeModal();
        //         nowLogin();
        //     })
        //     .catch((error) => {
        //         // Handle API error
        //         alert(error.response.data.message);
        //         homePage();
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
        setIsLoading(true);
        setTimeout(() => {          
            try {
                alert('Sigup successfully');          
                reset();
                closeModal();
                nowLogin();
            } catch (error) {
                alert(error);
            } finally {
                setIsLoading(false);
            }
            
            // setLoading(false); // Set loading to false after the data is fetched
        }, 2000);
    };

    return (
        <MyModal isOpen={isOpen} closeModal={closeModal} title="">
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
                        error={errors.fullname}
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

                    <div className="mt-4">
                        <ButtonModal title="Create Account" />
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
            {isLoading && <Spinner />}
        </MyModal>
    );
};
