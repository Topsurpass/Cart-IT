import React from 'react';
import { SpinnerCircularFixed } from 'spinners-react';

const SkeletonLoader = () => {
    return (
        <div className="relative flex w-full flex-wrap justify-center gap-5 self-center">
            {/* Spinner overlay */}
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <SpinnerCircularFixed
                    size={90}
                    thickness={68}
                    speed={109}
                    color="rgba(57, 94, 172, 1)"
                    secondaryColor="rgba(57, 99, 172, 0.49)"
                />
            </div>

            {/* Skeleton loader */}
            {[...Array(8)].map((_, index) => (
                <div
                    key={index}
                    className="mb-4 h-[200px] w-full flex-col rounded-md border-2 bg-white p-1 drop-shadow-lg hover:cursor-pointer hover:border-2 hover:border-sky-500 hover:shadow-lg hover:shadow-slate-600 md:mb-0 md:w-[45%] lg:w-[22.5%]"
                ></div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
