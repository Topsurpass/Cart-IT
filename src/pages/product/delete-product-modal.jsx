import React from 'react';
import MyModal from '@/components/ui/Modal';
import { ButtonModal } from '@/components/ui/ButtonModal';
import { HeaderModal } from '@/components/ui/HeaderModal';


export const DeleteProductModal = ({
    isOpen,
    closeModal,
    onConfirm,
    spinner
}) => {

    /**
     * Call the function when 'YES' is selected to delete a product
     */
    const deleteProduct = async () => {
        if (onConfirm) {
            await onConfirm();
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
            <h2 className="mt-5 text-center text-xl font-bold">
                Are you sure you want to delete this product ?{' '}
            </h2>
            <div className="mt-10 flex gap-5">
                <ButtonModal title="No" btnFunction={closeModal} />
                <ButtonModal
                    title="Yes"
                    btnFunction={deleteProduct}
                    addCol="w-[100%] justify-center rounded-md border border-transparent
             bg-red-500 px-4 py-2 text-lg font-bold text-white
              hover:bg-red-400 hover:text-white-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-red-500 focus-visible:ring-offset-2`"
                />
            </div>
            {spinner}
        </MyModal>
    );
};
