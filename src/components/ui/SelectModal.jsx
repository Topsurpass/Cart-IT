import { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Controller } from 'react-hook-form'; 
import categoryData from '@/utils/data/categoryData';
import { Check } from 'lucide-react';
import axios from 'axios';

export const SelectModal = ({ control, name}) => {
    const [selectedCategory, setSelectedCategory] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await axios.get('http://localhost:5000/api/v1/category/all', {
                    withCredentials: true,
                });
                setSelectedCategory(response.data);          
                
            } catch (error) {
                alert(error.response.data.message);
                if (error.response && error.response.status === 401){                    
                    homePage();
                };    
            }
        };
        fetchData();
     
    }, [])

    return (
        <div className="mt-5">
            <span className="font-bold">Select a category</span>
            <span className="text-red-500"> *</span>
            <Controller
                name={name}
                control={control}
                defaultValue={selectedCategory}
                render={({ field }) => (
                    <Listbox
                        value={field.value}
                        onChange={(newValue) => {
                            field.onChange(newValue);
                            setSelectedCategory(newValue);
                        }}
                    >
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">
                                    {selectedCategory.categoryName}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <Check
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {categoryData.map((category) => (
                                        <Listbox.Option
                                            key={category.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? 'bg-amber-100 text-amber-900'
                                                        : 'text-gray-900'
                                                }`
                                            }
                                            value={category}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected
                                                                ? 'font-medium'
                                                                : 'font-normal'
                                                        }`}
                                                    >
                                                        {category.categoryName}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <Check
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                )}
            />
        </div>
    );
};
