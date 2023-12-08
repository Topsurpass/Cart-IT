import React from 'react';
import logo from '@/assets/icons/cartit.png';
import { X } from 'lucide-react';

export const HeaderModal = ({ closeModal, title }) => {
    return (
        <div className="flex w-full justify-center border-b-2">
            <div className="flex w-full flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-42 h-10" />
                    <p className="font-bree text-xl font-bold text-red-500">
                        Cart IT
                    </p>
                </div>
                <p className="my-2 w-full text-center text-sm text-slate-500">
                    {title}
                </p>
            </div>
            <X className="cursor-pointer" onClick={closeModal} />
        </div>
    );
};
