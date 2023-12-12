import { useState} from 'react';
import Catalog from '@/components/features/Catalog';
import Pagination from '@/components/features/Pagination';
import { RegisterModal } from '@/pages/home/register-modal';
import { Link } from 'react-router-dom';

export const  ProductPage = () => {
    const [openRegisterModal, setopenRegisterModal] = useState(false);
    
    const handleCloseRegisterModal = () => setopenRegisterModal(false);
    
    return (
        <main className="px-5">
            <div className="flex h-[100vh] flex-col rounded-md border bg-slate-50 p-3">
                <Link
                    className="mb-2 h-10 rounded-md  p-2 border-b-2 hover:bg-blue-200"
                    onClick={() => setopenRegisterModal(true)}
                >
                    Add new category
                </Link>
            </div>
            <Catalog catalogName="Manage Category">
                <div className="mt-10 mb-10 w-[80%]">
                </div>
            </Catalog>
            <Pagination />
            <RegisterModal>
                isOpen={openRegisterModal}
                closeModal={handleCloseRegisterModal}
            </RegisterModal>
        </main>
    );
};
