import { useState, useEffect } from 'react';
import Catalog from '@/components/features/Catalog';
import { ViewProduct } from '@/pages/home/view-product-details';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { Layout } from './layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiBaseUrl from '@/api/baseUrl';
import cn from '@/utils/utils';

export const DashBoard = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemSelected, setIsSelectedItem] = useState(false);
    const [catalogProducts, setCatalogProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(true);

    const navigate = useNavigate();

    /**
     * Get all category stored in database for a particular merchat / user and
     * display in dashboard
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/product/all`, {
                    withCredentials: true,
                });
                setCatalogProducts(response.data);
            } catch (error) {
                if (
                    error.response &&
                    (error.response.status === 401 ||
                        error.response.status === 403)
                ) {
                    setIsAuthorized(false);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (!isAuthorized) {
        navigate('/');
        return null; // Render nothing if not authorized
    }
    /**
     * Select item to view
     * @param {Object} item
     */
    const handleSelectItem = (item) => {
        setIsSelectedItem(true);
        setSelectedItem(item);
    };

    return (
        <Layout>
            <Catalog>
                <div className="grid grid-cols-4 gap-2">
                    {!loading && catalogProducts.length === 0 ? (
                        <div className="col-span-5 flex h-[200px] w-full items-center justify-center rounded-md border-2 border-dashed">
                            <p>No product available</p>
                        </div>
                    ) : !loading ? (
                        catalogProducts.map((item, idx) => {
                            return (
                                <div
                                    key={item._id.$oid}
                                    onClick={() => handleSelectItem(item)}
                                    className={cn(
                                        'flex h-[300px] cursor-pointer flex-col items-center rounded-md border bg-white p-4 drop-shadow-lg hover:border-sky-500 hover:shadow-lg hover:shadow-slate-600',
                                        {
                                            'mb-28':
                                                catalogProducts.length ===
                                                idx + 1,
                                        }
                                    )}
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className=" h-[200px]  w-full"
                                    />

                                    <div className="w-full">
                                        <p>{item.name}</p>
                                        <p className="font-bold">{`$${item.price}`}</p>
                                        <p
                                            className={cn('text-xs', {
                                                'text-red-500':
                                                    Number(item.quantity) === 0,
                                            })}
                                        >
                                            {Number(item.quantity) === 0
                                                ? 'Out of stock'
                                                : `${item.quantity} items left`}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-4 flex w-full items-center justify-center">
                            <SkeletonLoader />
                        </div>
                    )}
                </div>
            </Catalog>

            {isItemSelected && (
                <ViewProduct
                    isOpen={isItemSelected}
                    closeModal={() => setIsSelectedItem(false)}
                    item={selectedItem}
                />
            )}
        </Layout>
    );
};
