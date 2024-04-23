const SkeletonLoader = () => {
    return (
        <div className="grid w-full md:grid-cols-4 gap-2">
            {/* Skeleton loader */}
            {[...Array(8)].map((_, index) => (
                <div
                    key={index}
                    className="flex animate-pulse cursor-pointer flex-col items-center justify-center rounded-md border bg-slate-100 drop-shadow-lg hover:border-sky-500 hover:shadow-lg hover:shadow-slate-600 h-[300px]"
                ></div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
