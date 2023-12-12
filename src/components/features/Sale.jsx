import React from 'react';
import hotSale from '../../utils/data/hotSale';

const Sale = () => {
    return (
        <div className="mt-10 border-b-2 pb-0 md:flex md:justify-between md:pb-10">
            <div className="w-full md:w-[40%]">
                <h2 className="mb-0 text-xl font-bold md:mb-2 md:text-2xl">
                    About CartIt
                </h2>

                <p className="text-sm md:text-lg">
                    CartIt is an online ecommerce store management system where
                    sellers get to manage their products that will eventually be
                    listed and displayed for their buyers. With CartIt, you as
                    the seller can perform tasks such as creating new category
                    of products, create and list new products, display all your
                    products and their category, delete and update a product
                    e.t.c.
                </p>
            </div>
            <div className="mt-10 w-full md:mt-0 md:w-[55%] lg:w-[48%]">
                <button
                    type="button"
                    className="mb-5 h-10 w-full rounded-tl-lg bg-red-600 pl-5 text-left text-xl font-bold text-white"
                >
                    HOT SALE!!!
                </button>
                <div className="md:flex md:justify-between">
                    {hotSale.map((value) => (
                        <div
                            className="mb-10 flex-col rounded-md border-2 bg-white p-1 drop-shadow-lg hover:cursor-pointer hover:border-2 hover:border-sky-500 hover:shadow-lg hover:shadow-slate-600 md:mb-0"
                            key={value.id}
                        >
                            <img
                                src={value.img}
                                alt="product one"
                                className="mb-3 w-full"
                            />
                            <div className="w-full text-lg md:text-sm">
                                {value.productTitle}
                            </div>
                            <p className="font-bold ">{value.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sale;
