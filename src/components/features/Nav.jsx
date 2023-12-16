import logo from '@/assets/icons/cartit.png';
import { Link } from 'react-router-dom';

function Nav({ children, home}) {
    return (
        <nav className="fixed left-0 right-0 top-0 z-50 flex h-20 w-auto items-center justify-between border-b-2 bg-white px-5">
            <Link
                to={home}
                className="flex cursor-pointer items-center justify-center"
            >
                <img src={logo} alt="Logo" className="w-42 h-10" />
                <p className="font-bree text-xl font-bold text-red-500">
                    Cart IT
                </p>
            </Link>
            {children}
        </nav>
    );
}

export default Nav;
