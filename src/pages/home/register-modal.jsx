import MyModal from '@/components/ui/Modal';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { FormInput } from '@/components/features/FormInput';
import { useForm } from 'react-hook-form';
import { HeaderModal } from '@/components/ui/HeaderModal';

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
        <>
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
                                pattern: {
                                    value: /^[A-Za-z\s]{6,}$/i,
                                },
                                maxLength: 30
                            })}
                            errMessaage="Minimum of 6 and max of 30 letters"
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
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                                    },
                                    maxLength: 15
                                })}
                                errMessaage="Max length of 15 with 1 digit no special character"
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
                                    <span className="-mt-5 text-xs text-red-500">
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
