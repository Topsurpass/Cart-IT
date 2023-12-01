import logo from '@/assets/icons/cartit.png';

function Nav({ handleLogin, handleRegister }) {
    return (
        <>
            <nav className="fixed left-0 right-0 top-0 z-10 flex h-20 w-auto items-center justify-between border-b-2 bg-white px-5">
                <div className='flex justify-center items-center cursor-pointer'>
                    <img src={logo} alt="Logo" className="w-42 h-10" />
                    <p className='font-bold font-bree text-xl text-red-500'>Cart IT</p>
                </div>

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
            </nav>
        </>
    );
}

export default Nav;
