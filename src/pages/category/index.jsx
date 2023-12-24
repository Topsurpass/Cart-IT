import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import Catalog from '@/components/features/Catalog';
import Table from '@/components/features/Table';
import categoryData from '@/utils/data/categoryData';
import { useState, useEffect } from 'react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoaded';
import { AddCategoryModal } from '@/pages/category/add-category-modal';
import { UpdateCategoryModal } from '@/pages/category/update-category-modal';
import { DeleteCategoryModal } from '@/pages/category/delete-category-modal';
import Spinner from '@/components/ui/Spinner';

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

    // Fake api call to list all category of a user
    // http://localhost:5000/api/v1/category/all
    useEffect(() => {
        setTimeout(() => {
            setCategory(categoryData);
            setLoading(false); // Set loading to false after the data is fetched
        }, 5000);
    }, []);

    const selectUpdateCategory = (row) => {
        // Selectt category to update and pre-filled all input fields
        const initialValues = {
            name: row.original.categoryName,
            description: row.original.description,
        };
        setInitialFormValues(initialValues);
        setOpenUpdateModal(true);
        setUpdateItem(row);
    };

    const SelectDeleteCategory = (row) => {
        setOpenDeleteModal(true);
        setDeletedItem(row);
    };

    const handleSubmitAddCategory= async (formData) => {
        // This calls the API for user add product
        //http//localhost:5000/api/v1/category/new POST
        setIsSpinning(true);
        setTimeout(() => {
            try {
                // Make your API request here using formData
                // Example: await api/category/add(formData);
                alert('New category added:', formData);
                setOpenAddModal(false);
            } catch (error) {
                // Handle API error
                console.error('API request failed:', error);
            } finally {
                setIsSpinning(false);
            }
        }, 2000);
        
    };

    const handleSubmitUpdatCategory = async () => {
        // This calls the API for user update category
        //http//localhost:5000/api/v1/category/edit/index PUT
        setIsSpinning(true);
        setTimeout(() => {
            try {
                // Make your API request here using formData
                alert('Category Updated:', updateItem);
                setOpenUpdateModal(false);
                
            } catch (error) {
                // Handle API error
                console.error('API request failed:', error);
            } finally {
                setIsSpinning(false);
            }
        }, 2000);
        
    };

    const handleSubmitDeleteCategory = (row) => {
        // Api call to delete the row
        // http://localhost:5000/api/v1/category/delete/index
        setIsSpinning(true);
        setTimeout(() => {
            try {
                // Make your API request here using formData
                alert(
                    `${row.original.categoryName} category of index ${row.index} deleted`
                );
                setOpenDeleteModal(false);
            } catch (error) {
                // Handle API error
                console.error('API request failed:', error);
            } finally {
                setIsSpinning(false);
            }
        }, 2000);
    };


    const columns = [
        {
            accessorKey: 'categoryName', //access nested data with dot notation
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
        <main className="px-5">
            <ResponsiveUserAuthNav home="/dashboard" />
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
        </main>
    );
};
