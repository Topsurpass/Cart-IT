import Catalog from '@/components/features/Catalog';
import Table from '@/components/features/Table';
import { useState, useEffect } from 'react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoaded';
import { AddCategoryModal } from '@/pages/category/add-category-modal';
import { UpdateCategoryModal } from '@/pages/category/update-category-modal';
import { DeleteCategoryModal } from '@/pages/category/delete-category-modal';
import LoadButton from '@/components/ui/ButtonLoading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import apiBaseUrl from '@/api/baseUrl';
import { Layout } from '../dashboard/layout';

export const CategoryPage = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState(null);
    const [updateItem, setUpdateItem] = useState(null);
    const [deletedItem, setDeletedItem] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(true);

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
    ]);

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
    const handleSubmitAddCategory = async (formData) => {
        const userData = {
            name: formData.name,
            description: formData.description,
        };
        try {
            const response = await axios.post(
                `${apiBaseUrl}/category/new`,
                userData,
                {
                    withCredentials: true,
                }
            );
            toast('New category added');
            setOpenAddModal(false);
            setCategory(response.message)
            
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
     * This calls the API for updating user's category
     * @param {Object} formData
     */
    const handleSubmitUpdatCategory = async (formData) => {
        const userData = {
            name: formData.name,
            description: formData.description,
        };
        const idx = updateItem.index;

        try {
            const response = await axios.put(
                `${apiBaseUrl}/category/edit/${idx}`,
                userData,
                {
                    withCredentials: true,
                }
            );
            toast('Category updated successfully');
            setOpenUpdateModal(false);
            setCategory(response.message);
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
     * This calls the API for deleting user's category
     */
    const handleSubmitDeleteCategory = async (row) => {
        const idx = deletedItem.index;
        try {
            const response = await axios.delete(
                `${apiBaseUrl}/category/delete/${idx}`,
                {
                    withCredentials: true,
                }
            );
            toast('Category deleted successfully');
            setOpenDeleteModal(false);
            setCategory(response.message);
        } catch (error) {
            toast(error.response.data.message);
            if (
                error.response &&
                (error.response.status === 401 || error.response.status === 403)
            ) {
                toast(error.response.data.message);
                navigate('/');
            }
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
                        handleClick={() => selectUpdateCategory(row)}
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
                        handleClick={() => SelectDeleteCategory(row)}
                    />
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <Catalog
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
                    onConfirm={() => handleSubmitDeleteCategory(deletedItem)}
                />
            )}
        </Layout>
    );
};

// export const CategoryPage = () => { 
//     return (
//         <p>Category page</p>
//     )
// }