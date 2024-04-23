import React from 'react';
import { ArrowDownUp, ChevronDown } from 'lucide-react';

const Catalog = ({
    children,
    showIcons,
    addButton,
    title,
    onClickAdd,
}) => {
    return (
        <div className="mt-3 h-screen w-full">
            <div className="mt-[75px] flex justify-between">
                {showIcons && (
                    <div className="flex w-40 md:mt-0">
                        <div className="flex w-20 cursor-pointer">
                            <ArrowDownUp className="mr-2 h-[100%] w-[30%]" />
                            <p className="font-semibold md:font-normal">Sort</p>
                        </div>
                        <div className="flex w-20 cursor-pointer">
                            <p className=" mr-2 font-bold">Date</p>
                            <ChevronDown />
                        </div>
                    </div>
                )}
                {addButton && (
                    <div className="flex w-full justify-end md:mt-0">
                        <button
                            onClick={onClickAdd}
                            className="hover:text-black-900 h-10 w-[150px]  justify-center rounded-md border
             border-transparent bg-blue-500  text-sm text-white hover:bg-blue-300 
              focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                        >
                            {title}
                        </button>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default Catalog;
