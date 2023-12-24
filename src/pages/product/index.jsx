import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import Catalog from '@/components/features/Catalog';
import Table from '@/components/features/Table';
import catalog from '@/utils/data/catalog';
import { useState, useEffect } from 'react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoaded';
import { AddProductModal } from './add-product-modal';
import { UpdateProductModal } from './update-product-modal';
import { DeleteProductModal } from './delete-product-modal';
import Spinner from '@/components/ui/Spinner';


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

    // Fake api call to list all product of a user
    // http://localhost:5000/api/v1/product/all GET
    //  useEffect(() => {
    //     try {
    //         const response = axios.get('http://localhost:5000/api/v1/product/all', {
    //             withCredentials: true, 
    //         });
    //         setCatalogProducts(response.data);
    //         setLoading(false);
    //     } catch (error){
    //         alert(error.message)
    //     }
        

    // }, []);

    //Simulating api for product
    useEffect(() => {
        setTimeout(() => {
            setCatalogProducts(catalog);
            setLoading(false); // Set loading to false after the data is fetched
        }, 5000);
    }, []);

    
    /**
     * Select table row to update
     * @param {Table row} row 
     */
 
    const selectUpdateProduct = (row) => {
        // Extract data from the row for initializing form fields
        const initialValues = {
            name: row.original.productTitle,
            image_url: row.original.image_url,
            description: row.original.description,
            price: row.original.price,
            quantity: row.original.quantity,
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
    
    
    const handleSubmitAddProduct = async (formData) => {
        // This calls the API for user add product
        //http//localhost:5000/api/v1/product/new POST
        setIsLoading(true);
        setTimeout(() => {
            try {
                // Make your API request here using formData
                // Example: await api/product/add(formData);
                alert('New product added:', formData);
                setOpenAddModal(false);
            } catch (error) {
                // Handle API error
                console.error('API request failed:', error);
            } finally {
                setIsLoading(false);
            }
        }, 2000);
    };

    const handleSubmitUpdateProduct = async (formData) => {
        // This calls the API for user update product
        //http//localhost:5000/api/v1/product/edit/index PUT
        setIsLoading(true);
        setTimeout(() => {
            try {
                // Make your API request here using formData
                // Example: await api/product/add(formData);
                alert('Product Updated:', updateItem);
                setOpenUpdateModal(false);
            } catch (error) {
                // Handle API error
                console.error('API request failed:', error);
            } finally {
                setIsLoading(false);
            }
        }, 2000);
        
    };
    
    const handleSubmitDeleteProduct = (row) => {
        // Api call to delete the row
        // http://localhost:5000/api/v1/product/delete/index
        setIsLoading(true);
        setTimeout(() => {
            
            try {
                // Make your API request here using formData
                // Example: await api/product/add(formData);
                alert(
                    `${row.original.productTitle} of index ${row.index} deleted`
                );
                setOpenDeleteModal(false);
            } catch (error) {
                // Handle API error
                console.error('API request failed:', error);
            } finally {
                setIsLoading(false);
            }
        }, 2000);
       
    };

    const columns = [
        {
            accessorKey: 'productTitle', //access nested data with dot notation
            header: 'Name',
            size: 100,
        },
        {
            accessorKey: 'description',
            header: 'Description',
            size: 400,
        },
        {
            accessorKey: 'price', //normal accessorKey
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
