import banner from '@/assets/images/cart.jpg';
import LoadButton from '../ui/ButtonLoading';

const Hero = ({ handleSignIn, handleSignUp }) => {
    return (
        <div className="h-screen overflow-hidden">
            <div className="absolute inset-0 mt-20 flex justify-center">
                <div className="w-full rounded-lg p-8 text-center">
                    <h2 className="text-2xl text-red-600 md:text-4xl">
                        CartIt admin page
                    </h2>
                    <p className="text-sm md:text-lg">
                        Create, view, update and delete items and different
                        categories.
                    </p>
                    <div className="mt-4 flex w-full items-center justify-center gap-5 text-white">
                        <LoadButton
                            type="submit"
                            variant="primary"
                            title="Login"
                            size="sm"
                            fullWidth={false}
                            className=" `w-[100%] group relative flex items-center justify-center self-center rounded-md border border-transparent
             bg-blue-500 px-6 py-2 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            isLoading={false}
                            loadingText="Please Wait..."
                            handleClick={handleSignIn}
                        />
                        <LoadButton
                            type="submit"
                            variant="primary"
                            title="Sign up"
                            size="sm"
                            fullWidth={false}
                            className=" `w-[100%] group relative flex items-center justify-center self-center rounded-md border border-transparent
             bg-blue-500 px-4 py-2 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            isLoading={false}
                            loadingText="Please Wait..."
                            handleClick={handleSignUp}
                        />
                    </div>
                </div>
            </div>
            <img
                src={banner}
                alt="sale banner"
                className="-mb-7 h-full w-full"
            />
        </div>
    );
};

export default Hero;
