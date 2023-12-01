import React from 'react';
import MyModal from '@/components/ui/Modal';

export const LoginModal = ({ isOpen, closeModal }) => {

    return (
        <>
            <MyModal isOpen={isOpen} closeModal={closeModal} title="">
                Please Login your details
            </MyModal>
        </>
    );
};
