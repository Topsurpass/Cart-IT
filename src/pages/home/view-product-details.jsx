import MyModal from '@/components/ui/Modal';


export const ViewProduct = ({ isOpen, closeModal, item }) => {
    return (
        <MyModal isOpen={isOpen} closeModal={closeModal} title="">
            <div className="flex flex-col justify-center">
                <h1 className="w-full border-b-2 text-center text-2xl font-bold">
                    Product Details
                </h1>
                <div className="mt-2 flex items-start justify-start gap-3 text-justify">
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-1/3"
                    />
                    <div className="flex flex-col gap-3 font-serif text-sm">
                        <p className="text-lg  text-black">
                            {item.name}
                        </p>
                        <div className="flex gap-3  text-gray-500">
                            <div className="rounded-md bg-slate-200 p-1">
                                Category A
                            </div>
                        </div>
                        <p className="text-lg font-bold text-black">
                            ${item.price}
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
                    <h2 className="font-bold">{item.seller}</h2>

                    <div className="flex gap-10">
                        <p className="pl-5">{item.phone}</p>
                        <p>{item.address}</p>
                    </div>       
                </div>
            </div>
        </MyModal>
    );
};
