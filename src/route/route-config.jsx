import { HomePage } from '@/pages/home';
import { CategoryPage } from '@/pages/category';
import { ProductPage } from '@/pages/product';
import { DashBoard } from '@/pages/dashboard';

const routeConfig = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/dashboard/category',
        element: <CategoryPage />
    },
    {
        path: '/dashboard/products',
        element: <ProductPage />
    },
    {
        path: '/dashboard',
        element: <DashBoard />
    }
];

export default routeConfig;
