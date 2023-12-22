import { useState, useEffect } from 'react';
import Catalog from '@/components/features/Catalog';
import Pagination from '@/components/features/Pagination';
import { ViewProduct } from '@/pages/home/view-product-details';
import catalog from '@/utils/data/catalog';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const DashBoard = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemSelected, setIsSelectedItem] = useState(false);
    const [catalogProducts, setCatalogProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const homePage = () => navigate('/');

    // Fake api call to list all product of a user
    // http://localhost:5000/api/v1/product/all
    axios.defaults.withCredentials = true;
    useEffect(() => {
        try {
            const response = axios.get('http://localhost:5000/api/v1/product/all', {
                withCredentials: true, 
            });
            const data = response.data;
            if (data){
                setCatalogProducts(data);
            }else {
                homePage();
            }  
            setLoading(false);
        } catch (error){
            if (error.response && error.response.status === 401){
                alert(error.response.statusText)
                console.log(error.response.statusText)
            }
            // // alert(error.statusText)
            // console.log(error)
        }
        

    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setCatalogProducts(catalog);
    //         setLoading(false); // Set loading to false after the data is fetched
    //     }, 5000);
    // }, []);

    const handleCloseViewProductModal = () => setIsSelectedItem(false);
    const handleSelectItem = (item) => {
        setIsSelectedItem(true);
        setSelectedItem(item);
    };

    return (
        <main className="px-5">
            <ResponsiveUserAuthNav />
            <Catalog catalogName="Product Catalog">
                <div className="mt-5 w-[100%] md:flex md:flex-wrap md:justify-between">
                    {!loading ? (
                        catalogProducts.map((item, idx) => {
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
                        })
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <SkeletonLoader />
                        </div>
                    )}
                </div>
            </Catalog>
            <Pagination />

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
