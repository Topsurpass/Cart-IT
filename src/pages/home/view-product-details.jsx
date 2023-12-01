import React from 'react';
import MyModal from '@/components/ui/Modal';

export const ViewProduct = ({ isOpen, closeModal, item }) => {
    return (
        <>
            <MyModal isOpen={isOpen} closeModal={closeModal} title="">
                <div className="flex flex-col justify-center">
                    <h1 className="w-full border-b-2 text-center text-2xl font-bold">
                        Product Details
                    </h1>
                    <div className="mt-2 flex items-start justify-start gap-3 text-justify">
                        <img
                            src={item.img}
                            alt={item.productTitle}
                            className="w-1/3"
                        />
                        <div className="flex flex-col gap-3 font-serif text-sm">
                            <p className="text-lg  text-black">
                                {item.productTitle}
                            </p>
                            <div className="flex gap-3  text-gray-500">
                                <div className="rounded-md bg-slate-200 p-1">
                                    Category A
                                </div>
                                <div className="rounded-md bg-slate-200 p-1">
                                    Category B
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-black">
                                {item.price}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h2 className="w-full border-b-2 text-left text-lg font-semibold">
                            Product Description
                        </h2>
                        <p className="text-justify">{item.description}</p>
                    </div>
                    <div className="mt-5">
                        <h2 className="w-full border-b-2 text-left text-lg font-semibold">
                            Seller Information
                        </h2>
                        <h2 className="text-xl font-bold">{item.seller}</h2>

                        {item.contact.map((seller, idx) => {
                            return (
                                <div className="flex gap-10" key={idx}>
                                    <li className="pl-5">{seller.phone}</li>
                                    <p>{seller.address}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </MyModal>
        </>
    );
};
