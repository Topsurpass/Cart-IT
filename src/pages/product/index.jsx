// import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import Catalog from '@/components/features/Catalog';
import Table from '@/components/features/Table';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoaded';
import LoadButton from '@/components/ui/ButtonLoading';
import { AddProductModal } from './add-product-modal';
import { UpdateProductModal } from './update-product-modal';
import { DeleteProductModal } from './delete-product-modal';
import { useNavigate } from 'react-router-dom';
import apiBaseUrl from '@/api/baseUrl';
import { Layout } from '../dashboard/layout';
import { toast } from 'sonner';

export const ProductPage = () => {
    const [catalogProducts, setCatalogProducts] = useState([]);
     const [updateProducts, setUpdateProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deletedItem, setDeletedItem] = useState(null);
    const [updateItem, setUpdateItem] = useState(null);
    const [initialFormValues, setInitialFormValues] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);

    const navigate = useNavigate();

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
    }, [
        openAddModal,
        openUpdateModal,
        openDeleteModal,
        deletedItem,
        updateItem,
    ]);;

    if (!isAuthorized) {
        navigate('/');
        return null; // Render nothing if not authorized
    }

    /**
     * Select table row to update.
     * Extract data from the row and initialize the form fields with it
     * @param {Table row} row
     */

    const selectUpdateProduct = (row) => {
        const initialValues = {
            name: row.original.name,
            image_url: row.original.image_url,
            description: row.original.description,
            price: row.original.price,
            quantity: row.original.quantity,
            index: row.index,
        };
        setInitialFormValues(initialValues);
        setOpenUpdateModal(true);
        setUpdateItem(row);
    };

    /**
     * Select table row to delete
     * @param {Table row} row
     */
    const SelectDeleteProduct = (row) => {
        setOpenDeleteModal(true);
        setDeletedItem(row);
    };

    /**
     * This calls the API for adding new product
     * Form to be set to the server
     * @param {Object} formData
     */
    const handleSubmitAddProduct = async (formData) => {
        const userData = {
            name: formData.name,
            image_url: formData.image_url,
            description: formData.description,
            category: formData.category.name,
            price: formData.price,
            quantity: formData.quantity,
        };
        try {
            const response = await axios.post(
                `${apiBaseUrl}/product/new`,
                userData,
                {
                    withCredentials: true,
                }
            );
            toast('New product added');
            setOpenAddModal(false);
            setCatalogProducts(response.message);
        } catch (error) {
            toast(error.response.data.message);
            if (
                error.response &&
                (error.response.status === 401 || error.response.status === 403)
            ) {
                navigate('/');
            }
        }
    };

    /**
     * This calls the API for updating user's product
     * @param {Object} formData
     */
    const handleSubmitUpdateProduct = async (formData) => {
        setIsLoading(true);
        const userData = {
            name: formData.name,
            image_url: formData.image_url,
            description: formData.description,
            category: formData.category.name,
            price: formData.price,
            quantity: formData.quantity,
        };
        const idx = initialFormValues.index;
        try {
            const response = await axios.put(
                `${apiBaseUrl}/product/edit/${idx}`,
                userData,
                {
                    withCredentials: true,
                }
            );
            toast('Product updated successfully');
            setOpenUpdateModal(false);
            setCatalogProducts(response.message);
        } catch (error) {
            toast(error.response.data.message);
            if (
                error.response &&
                (error.response.status === 401 || error.response.status === 403)
            ) {
                navigate('/');
            }
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * This calls the API for deleting user's product
     */

    const handleSubmitDeleteProduct = async () => {
        setIsLoading(true);
        const idx = deletedItem.index;
        try {
            const response = await axios.delete(
                `${apiBaseUrl}/product/delete/${idx}`,
                {
                    withCredentials: true,
                }
            );
            toast('Product deleted successfully');
            setOpenDeleteModal(false);
            setCatalogProducts(response.message);
        } catch (error) {
            toast(error.response.data.message);
            if (
                error.response &&
                (error.response.status === 401 || error.response.status === 403)
            ) {
                toast(error.response.data.message);
                navigate('/');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // The table's column
    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            size: 100,
        },
        {
            accessorKey: 'description',
            header: 'Description',
            size: 400,
        },
        {
            accessorKey: 'category',
            header: 'Category',
            size: 100,
        },
        {
            accessorKey: 'price',
            header: 'Price',
            size: 50,
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            size: 50,
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            size: 100,
            Cell: ({ row }) => (
                <div className="flex gap-3">
                    <LoadButton
                        type="submit"
                        variant="primary"
                        title={'Edit'}
                        size="sm"
                        fullWidth={false}
                        className="w-[100%] justify-center rounded-md border border-transparent
             bg-blue-500 px-4 py-1 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                        isLoading={false}
                        // loadingText="Loggin out..."
                        handleClick={() => selectUpdateProduct(row)}
                    />
                    <LoadButton
                        type="submit"
                        variant="primary"
                        title={'Delete'}
                        size="sm"
                        fullWidth={false}
                        className="w-[100%] justify-center rounded-md border border-transparent
             bg-red-500 px-4 py-1 text-lg font-bold text-white hover:bg-red-300 hover:text-red-900 
              focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                        isLoading={false}
                        // loadingText="Loggin out..."
                        handleClick={() => SelectDeleteProduct(row)}
                    />
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <Catalog
                addButton={true}
                title="Add New Product"
                onClickAdd={() => setOpenAddModal(true)}
            >
                {!loading ? (
                    <Table
                        data={catalogProducts}
                        onEdit={handleSubmitUpdateProduct}
                        onDelete={handleSubmitDeleteProduct}
                        columns={columns}
                    />
                ) : (
                    <TableSkeletonLoader />
                )}
            </Catalog>
            {openAddModal && (
                <AddProductModal
                    isOpen={openAddModal}
                    closeModal={() => {
                        setOpenAddModal(false);
                        setInitialFormValues(null);
                    }}
                    onSubmit={handleSubmitAddProduct}
                />
            )}
            {openUpdateModal && (
                <UpdateProductModal
                    isOpen={openUpdateModal}
                    closeModal={() => {
                        setOpenUpdateModal(false);
                        setInitialFormValues(null);
                    }}
                    initialFormValues={initialFormValues}
                    onSubmit={handleSubmitUpdateProduct}
                />
            )}
            {openDeleteModal && (
                <DeleteProductModal
                    isOpen={openDeleteModal}
                    closeModal={() => {
                        setOpenDeleteModal(false);
                        setDeletedItem(null);
                    }}
                    onConfirm={() => handleSubmitDeleteProduct(deletedItem)}
                />
            )}
        </Layout>
    );
};
