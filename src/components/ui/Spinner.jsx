import React from 'react';
import { SpinnerCircularFixed } from 'spinners-react';

const Spinner = () => {
    return (
        <div className="relative flex w-full flex-wrap justify-center gap-5 self-center">
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75">
                <SpinnerCircularFixed
                    size={50}
                    thickness={50}
                    speed={120}
                    color="rgba(57, 94, 172, 1)"
                    secondaryColor="rgba(57, 99, 172, 0.49)"
                />
            </div>
        </div>
    );
};

export default Spinner;
