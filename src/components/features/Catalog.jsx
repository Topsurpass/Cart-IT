import React from 'react';
import LoadButton from '@/components/ui/ButtonLoading';

const Catalog = ({ children, addButton, title, onClickAdd }) => {
    return (
        <div className="h-screen w-full">
            <div className="flex justify-between">
                {addButton && (
                    <div className="flex w-full justify-end md:mt-0">
                        <LoadButton
                            type="submit"
                            variant="primary"
                            title={title}
                            size="sm"
                            fullWidth={false}
                            className="hover:text-black-900 h-10 w-[150px]  justify-center rounded-md border
             border-transparent bg-blue-500  text-sm text-white hover:bg-blue-300 
              focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
                            isLoading={false}
                            // loadingText="Loggin out..."
                            handleClick={onClickAdd}
                        />
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default Catalog;
