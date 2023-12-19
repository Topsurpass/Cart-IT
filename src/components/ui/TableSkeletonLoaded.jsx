const TableSkeletonLoader = () => {
    return (
        <div className="mt-5 flex w-full animate-pulse flex-col space-y-1 border">
            {[...Array(4)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex w-full">
                    {[...Array(5)].map((_, colIndex) => (
                        <div
                            key={colIndex}
                            className="h-[100px] w-full animate-pulse bg-slate-200"
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TableSkeletonLoader;
