import { ShoppingCart, User, LayoutPanelTop } from 'lucide-react';

const navLinks = [
    {
        path: '/dashboard',
        icon: User,
        label: 'Dashboard',
    },
    {
        path: '/dashboard/products',
        icon: ShoppingCart,
        label: 'Manage Product',
    },
    {
        path: '/dashboard/category',
        icon: LayoutPanelTop,
        label: 'Manage Category',
    },
];

export default navLinks;
