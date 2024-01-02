import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import Catalog from '@/components/features/Catalog';
import Table from '@/components/features/Table';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoaded';
import { AddProductModal } from './add-product-modal';
import { UpdateProductModal } from './update-product-modal';
import { DeleteProductModal } from './delete-product-modal';
import Spinner from '@/components/ui/Spinner';
import { useNavigate } from 'react-router-dom';



export const ProductPage = () => {
    const [catalogProducts, setCatalogProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deletedItem, setDeletedItem] = useState(null);
    const [updateItem, setUpdateItem] = useState(null);
    const [initialFormValues, setInitialFormValues] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [isPageReady, setIsPageReady] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/product/all', {
                    withCredentials: true,
                });
                setCatalogProducts(response.data);          
                
            } catch (error) {
                if (error.response && (error.response.status === 401 || error.response.status === 403)){   
                    setIsAuthorized(false);
                    // alert(error.response.data.error);
                }; 
                              
            } finally {
                setLoading(false);
                setIsPageReady(true);
            }
        };
        fetchData();
    }, []);

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
        setIsLoading(true);
        const userData = {
            name: formData.name,
            image_url: formData.image_url,
            description: formData.description,
            category: formData.category.name,
            price: formData.price,
            quantity: formData.quantity
        }
        try {
            const response = await axios.post('http://localhost:5000/api/v1/product/new', userData, {
                withCredentials: true,
            });
            alert(response.data.message);
            setOpenAddModal(false);
            window.location.reload();  
        } catch (error) {
            alert(error.response.data.message);
            if (error.response && (error.response.status === 401 || error.response.status === 403)){
                navigate('/');
            };
        } finally {
            setIsLoading(false);
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
            quantity: formData.quantity
        }
        const idx = initialFormValues.index;
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/product/edit/${idx}`, userData, {
                withCredentials: true,
            });
            alert(response.data.message);
            setOpenUpdateModal(false);
            window.location.reload();  
        } catch (error) {
            alert(error.response.data.message);
            if (error.response && (error.response.status === 401 || error.response.status === 403)){
                navigate('/');
            };
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
            const response = await axios.delete(`http://localhost:5000/api/v1/product/delete/${idx}`, {
                withCredentials: true,
            });
            alert(response.data.message);
            setOpenDeleteModal(false);
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
            if (error.response && (error.response.status === 401 || error.response.status === 403)){
                alert(error.response.data.message);
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
                    <button
                        onClick={() => selectUpdateProduct(row)}
                        style={{ marginRight: '8px' }}
                        className="w-[100%] justify-center rounded-md border border-transparent
             bg-blue-500 px-4 py-1 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => SelectDeleteProduct(row)}
                        className="w-[100%] justify-center rounded-md border border-transparent
             bg-red-500 px-4 py-1 text-lg font-bold text-white hover:bg-red-300 hover:text-red-900 
              focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <main className="px-5">
            <ResponsiveUserAuthNav home="/dashboard" />
            <Catalog
                catalogName="Manage Products"
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
                    spinner={isLoading && <Spinner/>}
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
                    spinner = {isLoading && <Spinner/>}
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
                    spinner = {isLoading && <Spinner/>}
                    onConfirm={() => handleSubmitDeleteProduct(deletedItem)}
                />
            )}
        </main>
    );
};
