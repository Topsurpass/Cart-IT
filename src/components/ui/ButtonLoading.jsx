import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '@/utils/utils';
import { SpinnerCircular } from 'spinners-react';

const buttonVariants = cva('text-base', {
    variants: {
        variant: {
            primary: 'bg-red-500 text-white',
            secondary: 'bg-green-500',
            cancel: 'bg-gray-500',
        },
        size: {
            sm: 'px-2 py-2',
            md: 'px-4 py-2',
            lg: 'px-6 py-3',
        },
        fullWidth: {
            true: 'w-full',
        },
        disabled: {
            true: 'bg-gray-300 cursor-not-allowed',
        },
        loading: {
            true: 'relative text-center',
        },
    },
    compoundVariants: [
        {
            variant: 'primary',
            size: 'sm',
            class: 'rounded-md',
        },
    ],
    defaultVariants: {
        variant: 'primary',
        fullWidth: false,
        disabled: false,
        size: 'sm',
        loading: false,
    },
});

export default function LoadButton({
    variant,
    size,
    className,
    title,
    fullWidth,
    disabled,
    isLoading,
    loadingText,
    handleClick,
}) {
    return (
        <button
            type="submit"
            className={cn(
                buttonVariants({
                    variant,
                    size,
                    className,
                    fullWidth,
                    disabled,
                    loading: isLoading,
                })
            )}
            onClick={handleClick}
        >
            {isLoading && (
                <SpinnerCircular
                    size={15}
                    thickness={120}
                    speed={180}
                    color="white"
                    secondaryColor="rgba(0, 0, 0, 0.44)"
                    className="mr-2"
                />
            )}
            {isLoading ? loadingText : title}
        </button>
    );
}
