import React from 'react';
import { X } from 'lucide-react';

export const AddFormContactModal = ({ cancel }) => {
    return (
        <div className="relative flex flex-col items-center justify-center rounded-md border-2 px-3">
            <X
                className="absolute right-0 top-0 h-5 w-5 cursor-pointer bg-red-500 text-white"
                onClick={cancel}
            />
            <div className="flex gap-3 py-3">
                <div className="flex flex-col gap-3">
                    <label className="font-bold">Phone</label>
                    <input
                        type="text"
                        className="h-10 w-[100%] rounded-md border-2 pl-1"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="font-bold">Address</label>
                    <input
                        type="text"
                        className="h-10 w-[100%] rounded-md border-2 pl-1"
                    />
                </div>
            </div>
        </div>
    );
};
