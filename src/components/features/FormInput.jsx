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
        className: 'h-10 rounded border-2 pl-1',
    };

    return (
        <div className="mb-2 flex flex-col gap-2">
            <label className="font-bold">
                {labelName} <span className="text-red-500">{icon}</span>
            </label>
            <input {...inputProps} />
            {error && <span className="text-red-500">{errMessaage}</span>}
        </div>
    );
};
