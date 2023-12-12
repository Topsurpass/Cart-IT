import { useState, useEffect } from 'react';
import Nav from '@/components/features/Nav';
import Hero from '@/components/features/Hero';
import Sale from '@/components/features/Sale';
import Catalog from '@/components/features/Catalog';
import Pagination from '@/components/features/Pagination';
import catalogProducts from '@/utils/data/catalog';
import { LoginModal } from '@/pages/home/login-modal';
import { RegisterModal } from '@/pages/home/register-modal';
import { ViewProduct } from '@/pages/home/view-product-details';
import MobilNav from '@/components/features/MobileNav';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setopenRegisterModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemSelected, setIsSelectedItem] = useState(false);
    const [isMobileNav, setIsMobileNav] = useState(false);


    const handleCloseLoginModal = () => setOpenLoginModal(false);
    const handleCloseRegisterModal = () => setopenRegisterModal(false);
    const handleCloseViewProductModal = () => setIsSelectedItem(false);

    const handleSelectItem = (item) => {
        setIsSelectedItem(true);
        setSelectedItem(item);
    };

    // Toggle nav bar for responsivesness
    useEffect(() => {
        const handleResize = () => {
            setIsMobileNav(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <main className="px-5">
            {isMobileNav ? (
                <MobilNav>
                    <div className="flex h-[100vh] flex-col rounded-md border bg-slate-50 p-3">
                        <Link
                            className="mb-2 h-10 rounded-md  p-2 border-b-2 hover:bg-blue-200"
                            onClick={() => setOpenLoginModal(true)}
                        >
                            Login
                        </Link>
                        <Link
                            href="/category"
                            className="h-10 rounded-md p-2 border-b-2 hover:bg-blue-200"
                            onClick={() => setopenRegisterModal(true)}
                        >
                            Sign up
                        </Link>
                    </div>
                </MobilNav>
            ) : (
                <Nav
                    handleLogin={() => setOpenLoginModal(true)}
                    handleRegister={() => setopenRegisterModal(true)}
                />
            )}

            <Hero />
            <Sale />
            <Catalog catalogName="Product Catalog">
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
                closeModal={handleCloseLoginModal}
            />
            <RegisterModal
                isOpen={openRegisterModal}
                closeModal={handleCloseRegisterModal}
                nowLogin={() => setOpenLoginModal(true)}
            ></RegisterModal>
            {isItemSelected && (
                <ViewProduct
                    isOpen={isItemSelected}
                    closeModal={handleCloseViewProductModal}
                    item={selectedItem}
                />
            )}
        </main>
    );
};
