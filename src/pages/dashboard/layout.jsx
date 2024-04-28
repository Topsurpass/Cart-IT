import { ResponsiveUserAuthNav } from '@/layout/ResponsiveUserAuthNav';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadButton from '@/components/ui/ButtonLoading';
import cn from '@/utils/utils';
import navLinks from '@/utils/data/navLinks';


export const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
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
        <main className="flex overflow-hidden">
            <ResponsiveUserAuthNav home="/dashboard">
                <div className="flex h-screen w-full flex-col items-center justify-between gap-5 border-r">
                    <div className="mt-5 flex w-full flex-col gap-2">
                        {
                            navLinks.map((link, idx) => {
                                return (
                                    <div key={idx}
                                        className={cn(
                                            'justify-left flex h-[50px] items-center border border-r-0 text-lg text-blue-500 hover:bg-blue-300 hover:text-white',
                                            {
                                                'bg-blue-500 text-white':
                                                    pathname === link.path,
                                            }
                                        )}
                                    >
                                        <link.icon className='ml-10 mr-3'/>
                                        <Link to={link.path}>{link.label}</Link>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <LoadButton
                        type="submit"
                        variant="primary"
                        title={'Logout'}
                        size="sm"
                        fullWidth={true}
                        className="group relative mb-[120px] flex h-[50px] w-[80%] cursor-pointer items-center justify-center self-center rounded-md
                        bg-blue-500  p-2 text-white hover:bg-blue-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        isLoading={isLoading}
                        loadingText="Loggin out..."
                        handleClick={handleLogout}
                    />
                </div>
            </ResponsiveUserAuthNav>
            <div className="mt-24 w-full md:ml-[300px] overflow-x-scroll">{children}</div>
        </main>
    );
};
