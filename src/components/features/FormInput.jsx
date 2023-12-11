import React from 'react';

export const FormInput = ({
    labelName,
    icon,
    type,
    validation,
    error,
    errMessaage,
}) => {
    const inputProps = {
        type: type || 'text',
        ...validation,
        className: 'h-10 rounded border pl-1',
    };

    return (
        <div className="mb-2 flex flex-col gap-2">
            <label className="font-bold">
                {labelName} <span className="text-red-500">{icon}</span>
            </label>
<<<<<<< HEAD
            <input {...inputProps} />
            {error && <span className="text-red-500">{errMessaage}</span>}
=======
            <input {...inputProps}></input>
            {error && <span className="text-red-500 text-xs">{errMessaage}</span>}
>>>>>>> 98e8bcc39fe47982966df9da73cd53f51f5a832a
        </div>
    );
};
