import MobilNav from '@/components/features/MobileNav';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '@/components/features/Nav';
import { User } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ResponsiveUserAuthNav = ({home}) => {
    const [isMobileNav, setIsMobileNav] = useState(window.innerWidth <= 768);
    
    const navigate = useNavigate();

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

    
    // Logout user
    const handleLogout = async () =>{
        try{
            await axios.delete('http://localhost:5000/api/v1/auth/logout', {
                withCredentials: true,
            });
        } catch (error) {
            alert(error.message);
        } finally{
            navigate('/');
        }
        
    }

    
    return (
        <main className="px-5">
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
                        <div className="h-10 rounded-md border-b-2 p-2 hover:bg-blue-200 cursor-pointer" onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                </MobilNav>
            ) : (
                <Nav home={home}>
                    <div className="flex justify-end gap-3 text-xs font-semibold text-white">
                        <div className="flex justify-center gap-10 self-center">
                            <Link
                                to="/dashboard/products"
                                className="text-lg text-blue-500 md:hover:underline "
                            >
                                Manage Product
                            </Link>
                            <Link
                                to="/dashboard/category"
                                className=" text-lg text-blue-500 md:hover:underline"
                            >
                                Manage Category
                            </Link>
                            <div className='flex justify-center self-center gap-2'>
                                <User className="ml-10 h-8 w-8 rounded-[50%] bg-blue-500 text-white" />
                                <span className='text-blue-500 text-center flex justify-center self-center'>Welcome</span>
                            </div>
                            
                            <button className="h-10 rounded-md border-b-2 p-2 bg-blue-500 hover:bg-blue-200 cursor-pointer" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </Nav>
            )}
        </main>
    );
};
