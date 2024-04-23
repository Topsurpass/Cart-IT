import Catalog from '@/components/features/Catalog';
import Table from '@/components/features/Table';
import { useState, useEffect } from 'react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoaded';
import { AddCategoryModal } from '@/pages/category/add-category-modal';
import { UpdateCategoryModal } from '@/pages/category/update-category-modal';
import { DeleteCategoryModal } from '@/pages/category/delete-category-modal';
import Spinner from '@/components/ui/Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiBaseUrl from '@/api/baseUrl';
import { Layout } from '../dashboard/layout';



export const CategoryPage = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSpinning, setIsSpinning] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState(null);
    const [updateItem, setUpdateItem] = useState(null);
    const [deletedItem, setDeletedItem] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [isPageReady, setIsPageReady] = useState(false);

    const navigate = useNavigate();

     /**
     * Get all category stored in database for a particular merchat / user
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/category/all`, {
                    withCredentials: true,
                });
                setCategory(response.data);          
                
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

    const selectUpdateCategory = (row) => {
        const initialValues = {
            name: row.original.name,
            description: row.original.description,
        };
        setInitialFormValues(initialValues);
        setOpenUpdateModal(true);
        setUpdateItem(row);
    };

    /**
     * Select table row to delete
     * @param {Table row} row 
     */
    const SelectDeleteCategory = (row) => {
        setOpenDeleteModal(true);
        setDeletedItem(row);
    };


    /**
     * This calls the API for adding new category
     * Form to be set to the server
     * @param {Object} formData 
     */
    const handleSubmitAddCategory= async (formData) => {
        setIsSpinning(true);
        const userData = {
            name: formData.name,
            description: formData.description
        }   
        try {
            const response = await axios.post(`${apiBaseUrl}/category/new`, userData, {
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
            setIsSpinning(false);
        }
    };


    /**
     * This calls the API for updating user's category
     * @param {Object} formData 
     */
    const handleSubmitUpdatCategory = async (formData) => {
        setIsSpinning(true);
        const userData = {
            name: formData.name,
            description: formData.description
        }
        const idx = updateItem.index;

        try {
            const response = await axios.put(`${apiBaseUrl}/category/edit/${idx}`, userData, {
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
            setIsSpinning(false);
        }
      
    };


     /**
     * This calls the API for deleting user's category
     */
    const handleSubmitDeleteCategory = async (row) => {
        setIsSpinning(true);
        const idx = deletedItem.index;
        try {
            const response = await axios.delete(`${apiBaseUrl}/category/delete/${idx}`, {
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
            };
        } finally {
            setIsSpinning(false);
        }
    };
  

    // The table's column
    const columns = [
        {
            accessorKey: 'name', //access nested data with dot notation
            header: 'Category',
            size: 100,
        },
        {
            accessorKey: 'description',
            header: 'Description',
            size: 400,
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            size: 100,
            Cell: ({ row }) => (
                <div className="flex gap-3">
                    <button
                        onClick={() => selectUpdateCategory(row)}
                        style={{ marginRight: '8px' }}
                        className="w-[100%] justify-center rounded-md border border-transparent
             bg-blue-500 px-4 py-1 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => SelectDeleteCategory(row)}
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
        <Layout>
            <Catalog
                catalogName="Manage Category"
                addButton={true}
                title="Add New Category"
                onClickAdd={() => setOpenAddModal(true)}
            >
                {!loading ? (
                    <Table
                        data={category}
                        onEdit={handleSubmitUpdatCategory}
                        onDelete={handleSubmitDeleteCategory}
                        columns={columns}
                    />
                ) : (
                    <TableSkeletonLoader />
                )}
            </Catalog>
            {openAddModal && (
                <AddCategoryModal
                    isOpen={openAddModal}
                    closeModal={() => {
                        setOpenAddModal(false);
                        setInitialFormValues(null);
                    }}
                    spinner={isSpinning && <Spinner/>}
                    onSubmit={handleSubmitAddCategory}
                />
            )}
            {openUpdateModal && (
                <UpdateCategoryModal
                    isOpen={openUpdateModal}
                    closeModal={() => {
                        setOpenUpdateModal(false);
                        setInitialFormValues(null);
                    }}
                    spinner={isSpinning && <Spinner/>}
                    initialFormValues={initialFormValues}
                    onSubmit={handleSubmitUpdatCategory}
                />
            )}
            {openDeleteModal && (
                <DeleteCategoryModal
                    isOpen={openDeleteModal}
                    closeModal={() => {
                        setOpenDeleteModal(false);
                        setDeletedItem(null);
                    }}
                    spinner={isSpinning && <Spinner/>}
                    onConfirm={() => handleSubmitDeleteCategory(deletedItem)}
                />
            )}
        </Layout>
    );
};
