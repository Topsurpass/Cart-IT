export const ButtonModal = ({ title, btnFunction, addCol }) => {
    return (
        <button
            type="submit"
            className={addCol ? addCol: `w-[100%] justify-center rounded-md border border-transparent
             bg-blue-400 px-4 py-2 text-lg font-bold text-white
              hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2
               focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
            onClick={btnFunction || null}
        >
            {title}
        </button>
    );
};
