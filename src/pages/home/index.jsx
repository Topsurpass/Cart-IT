import { useState } from 'react';
import Hero from '@/components/features/Hero';
import Sale from '@/components/features/Sale';
import Catalog from '@/components/features/Catalog';
import Pagination from '@/components/features/Pagination';
import catalogProducts from '@/utils/data/catalog';
import { LoginModal } from '@/pages/home/login-modal';
import { RegisterModal } from '@/pages/home/register-modal';
import { ViewProduct } from '@/pages/home/view-product-details';
import { DefaultResponsiveNav } from '@/layout/DefaultResponsiveNav';


export const HomePage = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setopenRegisterModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemSelected, setIsSelectedItem] = useState(false);


    /**
     * Select item to perform operations on
     * @param {Object} item 
     */
    const handleSelectItem = (item) => {
        setIsSelectedItem(true);
        setSelectedItem(item);
    };

    return (
        <main className="px-5">
            <DefaultResponsiveNav
                openLogin={() => setOpenLoginModal(true)}
                openReg={() => setopenRegisterModal(true)}
                home="/"
            />
            <Hero />
            <Sale />
            <Catalog catalogName="Explore exciting products">
                <div className="mt-5 w-[100%] md:flex md:flex-wrap md:justify-between">
                    {catalogProducts.map((item, idx) => {
                        const addMarginBottom =
                            idx < catalogProducts.length - 4;
                        return (
                            <div
                                key={item.id}
                                onClick={() => handleSelectItem(item)}
                                className={`
                                    ${
                                        item.bestSeller
                                            ? 'border-2 border-red-600'
                                            : ''
                                    }
                                    ${addMarginBottom ? 'md:mb-8' : ''}
                                    w-full flex-col rounded-md border-2 bg-white p-1 drop-shadow-lg
                                    hover:cursor-pointer hover:border-2 hover:border-sky-500 hover:shadow-lg hover:shadow-slate-600 md:w-[22.5%]`}
                            >
                                {item.bestSeller && (
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 h-7 w-24 rounded-bl-lg bg-red-600 text-xs font-bold text-white"
                                    >
                                        BEST SELLER
                                    </button>
                                )}
                                <img
                                    src={item.img}
                                    alt={item.productTitle}
                                    className="mb-3 w-full"
                                />
                                <div className="w-full">
                                    {item.productTitle}
                                </div>
                                <p className="font-bold ">{item.price}</p>
                            </div>
                        );
                    })}
                </div>
            </Catalog>
            <Pagination />
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
                closeModal={()=> setopenRegisterModal(false)}
                nowLogin={() => setOpenLoginModal(true)}
                onSignin={() => {
                    setopenRegisterModal(false);
                    setOpenLoginModal(true);
                }}
            ></RegisterModal>
            {isItemSelected && (
                <ViewProduct
                    isOpen={isItemSelected}
                    closeModal={()=> setIsSelectedItem(false)}
                    item={selectedItem}
                />
            )}
        </main>
    );
};
