import React from 'react';
import MyModal from '@/components/ui/Modal';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { FormInput } from '@/components/features/FormInput';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { AddFormContactModal } from '@/components/features/AddFormContactModal';


export const RegisterModal = ({ isOpen, closeModal }) => {


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
                <div className="flex w-full flex-col justify-center">
                    <div className="flex justify-center  border-b-2">
                        <div className="mb-5 flex w-full flex-col justify-center">
                            <h1 className="w-full text-center text-2xl font-bold">
                                eTranzact eCommerce
                            </h1>
                            <p className="w-full text-center text-sm text-slate-500">
                                Create an account to list your own products
                            </p>
                        </div>
                        <X className="cursor-pointer" onClick={closeModal} />
                    </div>
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
                        <div className="flex gap-3">
                            <FormInput
                                labelName="Username"
                                icon="*"
                                validation={register('username', {
                                    required: true,
                                })}
                                errMessaage="Enter your username"
                                error={errors.username}
                            />
                            <div className="flex flex-col gap-5">
                                <label className="font-bold">
                                    Gender
                                    <span className="text-red-500"> *</span>
                                </label>
                                <div className="font-semibold">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        className="mr-1"
                                        {...register('gender', {
                                            required: true,
                                        })}
                                    />
                                    Male
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        className="ml-5 mr-1"
                                        {...register('gender', {
                                            required: true,
                                        })}
                                    ></input>
                                    Female
                                </div>
                                {errors.gender && (
                                    <span className="-mt-5 text-red-500">
                                        Select a gender
                                    </span>
                                )}
                            </div>
                        </div>

                        <FormInput
                            type="password"
                            labelName="Password"
                            icon="*"
                            validation={register('password', {
                                required: true,
                            })}
                            errMessaage="Enter your password"
                            error={errors.password}
                        />
                        <p className="mb-1 font-bold">Contact Info</p>
                        <div className=" flex flex-col items-center justify-center gap-3 rounded border-2 p-5">
                            <AddFormContactModal />
                        </div>

                        <div className="mt-4">
                            <ButtonModal title="Create Account" />
                        </div>
                        <p className="mt-3 text-center text-sm">
                            Already have an account ?{' '}
                            <a href="#" className="text-bold text-blue-500">
                                Login
                            </a>
                        </p>
                    </form>
                </div>
            </MyModal>
        </>
    );
};
