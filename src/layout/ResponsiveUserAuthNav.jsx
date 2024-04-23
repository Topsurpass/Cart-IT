import MobilNav from '@/components/features/MobileNav';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '@/components/features/Nav';
import { User } from 'lucide-react';
import axios from 'axios';


export const ResponsiveUserAuthNav = ({ home, children }) => {
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
        <main className="left-0 right-0 fixed z-30 md:h-screen md:w-[280px]">
            {isMobileNav ? (
                <MobilNav home={home}>
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
                <div className="mt-20 flex w-full">
                    <Nav
                        home={home}
                        user={
                            <div className="flex justify-center gap-2 self-center">
                                <User className="ml-10 h-8 w-8 rounded-[50%] bg-blue-500 text-white" />
                                <span className="flex justify-center self-center text-center text-blue-500">
                                    Welcome
                                </span>
                            </div>
                        }
                    />
                    {children}
                </div>
            )}
        </main>
    );
};
