import { useState } from 'react';
import Hero from '@/components/features/Hero';
import { LoginModal } from '@/pages/home/login-modal';
import { RegisterModal } from '@/pages/home/register-modal';

export const HomePage = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setopenRegisterModal] = useState(false);
    return (
        <main className="h-screen">
            <Hero
                handleSignIn={() => setOpenLoginModal(true)}
                handleSignUp={() => setopenRegisterModal(true)}
            />
            <LoginModal
                isOpen={openLoginModal}
                closeModal={() => setOpenLoginModal(false)}
                onSignup={() => {
                    setOpenLoginModal(false);
                    setopenRegisterModal(true);
                }}
            />
            <RegisterModal
                isOpen={openRegisterModal}
                closeModal={() => setopenRegisterModal(false)}
                nowLogin={() => setOpenLoginModal(true)}
                onSignin={() => {
                    setopenRegisterModal(false);
                    setOpenLoginModal(true);
                }}
            ></RegisterModal>
        </main>
    );
};
