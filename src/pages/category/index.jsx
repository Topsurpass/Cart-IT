import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import Catalog from '@/components/features/Catalog';
import { useState, useEffect } from 'react';

export const CategoryPage = () => {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        // Fetch category API
        //http://localhost:5000/api/v1/category/all
    })
    return (
        <main className="px-5">
            <ResponsiveUserAuthNav home="/dashboard" />
            <Catalog catalogName="Manage Category"></Catalog>
        </main>
    );
};
