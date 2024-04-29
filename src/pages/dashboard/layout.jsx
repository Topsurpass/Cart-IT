import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/icons/cartit.png';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import MobilNav from '@/components/features/MobileNav';

import LoadButton from '@/components/ui/ButtonLoading';
import { User } from 'lucide-react';

import cn from '@/utils/utils';
import navLinks from '@/utils/data/navLinks';
import apiBaseUrl from '@/api/baseUrl';

export const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const [isMobileNav, setIsMobileNav] = useState(window.innerWidth <= 768);

    // Toggle nav bar for responsivesness
    useEffect(() => {
        const handleResize = () => {
            setIsMobileNav(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/auth/profile`, {
                    withCredentials: true,
                });
                setUser(response.data.user);
                setDataFetched(true);
            } catch (error) {
                if (
                    error.response &&
                    (error.response.status === 401 ||
                        error.response.status === 403)
                ) {
                    navigate('/');
                }
            }
        };
        if (!dataFetched) {
            fetchData();
        }
    }, [user]);
    // Logout user
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await axios.delete('http://localhost:5000/api/v1/auth/logout', {
                withCredentials: true,
            });
            toast('Logged out.');
        } catch (error) {
            toast(error.message);
        } finally {
            navigate('/');
            setIsLoading(false);
        }
    };

    return (
        <main className="">
            <nav className="fixed left-0 right-0 top-0 z-50 flex h-20 w-auto items-center justify-between border bg-white px-5">
                {isMobileNav ? (
                    <MobilNav home={'/dashboard'}>
                        <div className="flex h-[100vh] flex-col rounded-md border bg-slate-50 p-3">
                            <Link
                                to="/dashboard/products"
                                className="mb-2 h-10 rounded-md  border-b-2 p-2 hover:bg-blue-200"
                            >
                                Manage Product
                            </Link>
                            <Link
                                to="/dashboard/category"
                                className="h-10 rounded-md border-b-2 p-2 hover:bg-blue-200"
                            >
                                Manage Category
                            </Link>
                            <div
                                className="h-10 cursor-pointer rounded-md border-b-2 p-2 hover:bg-blue-200"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                        </div>
                    </MobilNav>
                ) : (
                    <>
                        <Link
                            to={'/dashboard'}
                            className="flex cursor-pointer items-center justify-center"
                        >
                            <img src={logo} alt="Logo" className="w-42 h-10" />
                            <p className="font-bree text-xl font-bold text-red-500">
                                Cart IT
                            </p>
                        </Link>
                        <div className="flex justify-center gap-2 self-center">
                            <User className="ml-10 h-8 w-8 rounded-[50%] bg-blue-500 text-white" />
                            <span className="flex justify-center self-center text-center text-blue-500">
                                {user}
                            </span>
                        </div>
                    </>
                )}
            </nav>
            <div className="fixed flex w-full">
                <div className="hidden h-screen w-full flex-col items-center justify-between border-r md:flex md:w-[300px]">
                    <nav className="mt-[80px] flex w-full flex-col gap-2">
                        {navLinks.map((link, idx) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={idx}
                                    className={cn(
                                        'justify-left flex h-[50px] items-center border border-r-0 text-lg text-blue-500 hover:bg-blue-300 hover:text-white',
                                        {
                                            'bg-blue-500 text-white': isActive,
                                        }
                                    )}
                                    to={link.path}
                                >
                                    <link.icon className="ml-5 mr-3" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <LoadButton
                        type="submit"
                        variant="primary"
                        title={'Logout'}
                        size="sm"
                        fullWidth={true}
                        className="relative top-[100px] group mb-[120px] flex h-[50px] w-[80%] cursor-pointer items-center justify-center self-center rounded-md
                        bg-blue-500  p-2 text-white hover:bg-blue-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        isLoading={isLoading}
                        loadingText="Loggin out..."
                        handleClick={handleLogout}
                    />
                </div>

                <div className="mt-24 w-full overflow-scroll px-5">
                    {children}
                </div>
            </div>
        </main>
    );
};
