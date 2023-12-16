import MobilNav from '@/components/features/MobileNav';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '@/components/features/Nav';

export const DefaultResponsiveNav = ({ openLogin, openReg, home }) => {
    const [isMobileNav, setIsMobileNav] = useState(false);

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

    return (
        <main className="px-5">
            {isMobileNav ? (
                <MobilNav home={home}>
                    <div className="flex h-[100vh] flex-col rounded-md border bg-slate-50 p-3">
                        <Link
                            className="mb-2 h-10 rounded-md  border-b-2 p-2 hover:bg-blue-200"
                            onClick={openLogin}
                        >
                            Login
                        </Link>
                        <Link
                            href="/category"
                            className="h-10 rounded-md border-b-2 p-2 hover:bg-blue-200"
                            onClick={openReg}
                        >
                            Sign up
                        </Link>
                    </div>
                </MobilNav>
            ) : (
                <Nav home={home}>
                    <div className="flex justify-end gap-3 text-xs font-semibold text-white">
                        <button
                            type="button"
                            className=" h-8  w-32 rounded-lg bg-sky-500 md:h-12"
                            onClick={openLogin}
                        >
                            LOGIN
                        </button>
                        <button
                            type="button"
                            className="h-8 w-32 rounded-lg bg-sky-500 md:h-12"
                            onClick={openLogin}
                        >
                            REGISTER
                        </button>
                    </div>
                </Nav>
            )}
        </main>
    );
};
