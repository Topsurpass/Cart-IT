import { useState } from 'react';
import { Menu } from 'lucide-react';
import MyModal from '@/components/ui/Modal';
import logo from '@/assets/images/logo.png';

function MobileNav([openMenu, closeMenu, isOpen, closeModal, handleLogin, handleRegister]) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <MyModal isOpen={isOpen} closeModal={closeModal} title="">
            <div className="lg:hidden flex justify-between items-center h-16 top-16 bg-white relative shadow-sm transition">
                <div className="flex items-center cursor-pointer justify-center">
                    <img src={logo} alt="Logo" className="w-42 h-10" />
                    <p className="font-bree text-xl font-bold text-red-500">
                        Cart IT
                    </p>
                </div>
                <div className="px-4 cursor-pointer md:hidden" onClick={handleClick}>
                    <Menu
                        className="w-6 h-6 text-black"
                        onClick={openMenu, closeMenu}
                    />
                    <div className="flex justify-end gap-3 text-xs font-semibold text-white">
                        <button
                            type="button"
                            className=" h-8  w-32 rounded-lg bg-sky-500 md:h-12"
                            onClick={handleLogin}
                        >
                            LOGIN
                        </button>
                        <button
                            type="button"
                            className="h-8 w-32 rounded-lg bg-sky-500 md:h-12"
                            onClick={handleRegister}
                        >
                            REGISTER
                        </button>
                    </div>
                </div>
            </div>
        </MyModal>
    );
}

export default MobileNav;
