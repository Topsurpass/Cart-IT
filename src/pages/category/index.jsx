import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import Catalog from '@/components/features/Catalog';
import Table from '@/components/features/Table';
import categoryData from '@/utils/data/categoryData';
import { useState, useEffect } from 'react';
import TableSkeletonLoader from '@/components/ui/TableSkeletonLoaded';

export const CategoryPage = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fake api call to list all product of a user
    // http://localhost:5000/api/v1/product/all
    useEffect(() => {
        setTimeout(() => {
            setCategory(categoryData);
            setLoading(false); // Set loading to false after the data is fetched
        }, 5000);
    }, []);

    const handleEdit = (row) => {
        // Api call to edit the row
        // http://localhost:5000/api/v1/catalog/edit/index
        alert(`${row.original.categoryName} category of index ${row.index} edited`);
    };
    const handleDelete = (row) => {
        // Api call to delete the row
        // http://localhost:5000/api/v1/catalog/delete/index
        alert(
            `${row.original.categoryName} category of index ${row.index} deleted`
        );
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
                        onClick={() => handleEdit(row)}
                        style={{ marginRight: '8px' }}
                        className="w-[100%] justify-center rounded-md border border-transparent
             bg-blue-500 px-4 py-1 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row)}
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
            >
                {!loading ? (
                    <Table
                        data={category}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        columns={columns}
                    />
                ) : (
                    <TableSkeletonLoader />
                )}
            </Catalog>
        </main>
    );
};
