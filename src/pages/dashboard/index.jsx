import { useState, useEffect } from 'react';
import Catalog from '@/components/features/Catalog';
import Pagination from '@/components/features/Pagination';
import { ViewProduct } from '@/pages/home/view-product-details';
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

   /**
     * Get all category stored in database for a particular merchat / user and
     * display in dashboard
     */
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/product/all', {
                withCredentials: true, 
            });
            setCatalogProducts(response.data);
        } catch (error){
            alert(error.response.data.error);    
            if (error.response && error.response.status === 401){
                homePage();
            }  
        } finally {
            setLoading(false);
        }
    };
    fetchData();  

    }, []);

    
    /**
     * Select item to view
     * @param {Object} item 
     */
    const handleSelectItem = (item) => {
        setIsSelectedItem(true);
        setSelectedItem(item);
    };

    return (
        <main className="px-5">
            <ResponsiveUserAuthNav/>
            <Catalog catalogName="Product Catalog">
                <div className="mt-5 w-[100%] md:flex md:flex-wrap md:justify-between">
                    {!loading ? (
                        catalogProducts.map((item, idx) => {
                            return (
                                <div
                                key={item._id.$oid}
                                onClick={() => handleSelectItem(item)}
                                className='w-full flex-col rounded-md border-2 bg-white p-1 drop-shadow-lg
                                hover:cursor-pointer hover:border-2 hover:border-sky-500 hover:shadow-lg hover:shadow-slate-600 md:w-[22.5%]'
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="mb-3 w-full"
                                />
                                <div className="w-full">
                                    {item.description}
                                </div>
                                <p className="font-bold ">{item.price}</p>
                            </div>);
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
                    closeModal={()=>setIsSelectedItem(false)}
                    item={selectedItem}
                />
            )}
        </main>
    );
};
