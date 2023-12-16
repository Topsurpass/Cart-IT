import React from 'react';
import { ArrowDownUp, ChevronDown } from 'lucide-react';

const Catalog = ({ catalogName, children }) => {
    return (
        <div>
            <div className="mt-[100px] flex justify-between border-b-2 border-sky-500 pb-1">
                <div
                    className="text-center text-lg font-bold md:text-left md:text-lg"
                    autoCapitalize="characters"
                >
                    {catalogName}
                </div>
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
            </div>
            {children}
        </div>
    );
};

export default Catalog;
