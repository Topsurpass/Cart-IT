import React from 'react';
import MyModal from '@/components/ui/Modal';
import LoadButton from '@/components/ui/ButtonLoading';
import { toast } from 'sonner';
import { HeaderModal } from '@/components/ui/HeaderModal';
import { useState } from 'react';

export const DeleteProductModal = ({ isOpen, closeModal, onConfirm }) => {
    const [isLoading, setisLoading] = useState(false);
    const deleteProduct = async (data) => {
        try {
            setisLoading(true);
            if (onConfirm) {
                await onConfirm(data);
            }
        } catch (error) {
            toast('Error deleting product:', error);
            setisLoading(false);
        } finally {
            setisLoading(false);
        }
    };

    return (
        <MyModal isOpen={isOpen} closeModal={closeModal} title="">
            <div className="flex w-full justify-center">
                <HeaderModal
                    closeModal={closeModal}
                    title="Product deleted cannot be restored"
                />
            </div>
            <h2 className="mt-5 text-center">
                The selected product will be deleted
            </h2>
            <div className="mt-10 flex gap-5">
                <LoadButton
                    type="submit"
                    variant="primary"
                    title="Cancel"
                    size="sm"
                    fullWidth={true}
                    className=" `w-[100%] group relative flex items-center justify-center self-center rounded-md border border-transparent
             bg-blue-500 px-4 py-2 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    isLoading={false}
                    // loadingText="Updating..."
                    handleClick={closeModal}
                />
                <LoadButton
                    type="submit"
                    variant="primary"
                    title="Delete"
                    size="sm"
                    fullWidth={true}
                    className="hover:text-white-900 focus-visible:ring-offset-2` group relative flex w-[100%] items-center justify-center self-center rounded-md
             border border-transparent bg-red-500 px-4 py-2 text-lg
              font-bold text-white hover:bg-red-400 focus:outline-none
               focus-visible:ring-2 focus-visible:ring-red-500"
                    isLoading={isLoading}
                    loadingText="Deleting..."
                    handleClick={deleteProduct}
                />
            </div>
        </MyModal>
    );
};
