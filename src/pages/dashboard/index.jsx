import { useState, useEffect } from 'react';
import Catalog from '@/components/features/Catalog';
import { ViewProduct } from '@/pages/home/view-product-details';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { Layout } from './layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiBaseUrl from '@/api/baseUrl';

export const DashBoard = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemSelected, setIsSelectedItem] = useState(false);
    const [catalogProducts, setCatalogProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(true);
    // const [isPageReady, setIsPageReady] = useState(false);

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
                // setIsPageReady(true);
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
                <div className="grid gap-2 md:grid-cols-4">
                    {catalogProducts.length === 0 ? (
                        <div className="col-span-4 flex w-full items-center justify-center h-[200px] border-dashed border-2 rounded-md">
                            <p>No product available</p>
                        </div>
                    ) : !loading ? (
                        catalogProducts.map((item, idx) => {
                            return (
                                <div
                                    key={item._id.$oid}
                                    onClick={() => handleSelectItem(item)}
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-md border bg-white p-3 drop-shadow-lg hover:border-sky-500 hover:shadow-lg hover:shadow-slate-600"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="h-[70%] w-full"
                                    />
                                    <div className="h-[20%] w-full">
                                        <p>{item.name}</p>
                                        <p className="font-bold">{`$${item.price}`}</p>
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
