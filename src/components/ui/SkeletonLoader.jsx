const SkeletonLoader = () => {
    return (
        <div className="relative mt-5 flex w-[100%] animate-pulse flex-wrap justify-between gap-5 self-center rounded-md md:flex md:flex-wrap">
            {/* Skeleton loader */}
            {[...Array(8)].map((_, index) => (
                <div
                    key={index}
                    className="mb-4 flex h-[300px] w-full animate-pulse flex-col rounded-md border-2 bg-slate-200 hover:cursor-pointer hover:border-2 hover:border-sky-500 hover:shadow-lg hover:shadow-slate-600 md:mb-0 md:w-[45%] lg:w-[22.5%] "
                ></div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
