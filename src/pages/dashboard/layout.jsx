import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import cn from '@/utils/utils';

export const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    // Logout user
    const handleLogout = async () => {
        try {
            await axios.delete('http://localhost:5000/api/v1/auth/logout', {
                withCredentials: true,
            });
        } catch (error) {
            alert(error.message);
        } finally {
            navigate('/');
        }
    };

    return (
        <main className="flex ">
            <ResponsiveUserAuthNav home="/dashboard">
                <div className="flex h-screen w-full flex-col items-center justify-between gap-5 border-r">
                    <div className="mt-5 flex w-full flex-col gap-2">
                        <Link
                            to="/dashboard/products"
                            className={cn(
                                'm flex h-[50px] items-center justify-center border border-r-0 text-lg text-blue-500 hover:bg-blue-300 hover:text-white',
                                {
                                    'bg-blue-500 text-white':
                                        pathname === '/dashboard/products',
                                }
                            )}
                        >
                            Manage Product
                        </Link>
                        <Link
                            to="/dashboard/category"
                            className={cn(
                                'm flex h-[50px] items-center justify-center border border-r-0 text-lg text-blue-500 hover:bg-blue-300 hover:text-white',
                                {
                                    'bg-blue-500 text-white':
                                        pathname === '/dashboard/category',
                                }
                            )}
                        >
                            Manage Category
                        </Link>
                    </div>

                    <button
                        className="mb-[120px] h-[50px] w-[80%] cursor-pointer rounded-md bg-blue-500 p-2 text-white hover:bg-blue-800 hover:text-white"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </ResponsiveUserAuthNav>
            <div className="mt-[20px] w-full md:ml-[300px]">{children}</div>
        </main>
    );
};
