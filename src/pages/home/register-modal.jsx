import { useForm } from 'react-hook-form';
import MyModal from '@/components/ui/Modal';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { FormInput } from '@/components/features/FormInput';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { AddFormContactModal } from '@/components/features/AddFormContactModal';
import { LoginModal } from './login-modal';

export const RegisterModal = ({ isOpen, closeModal, nowLogin }) => {
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
        nowLogin();
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
                                />
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
    );
};
