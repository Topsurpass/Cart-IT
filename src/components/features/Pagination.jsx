import prev from '@/assets/icons/prev.png';
import back from '@/assets/icons/back.png';
import forward from '@/assets/icons/forward.png';
import next from '@/assets/icons/next.png';

const Pagination = () => {
    return (
        <div className="mt-16 w-full">
            <div className="mx-auto flex w-[80%] justify-between md:mx-auto md:w-[50%] lg:w-[25%]">
                <img
                    src={[prev]}
                    alt="previous btn"
                    className="h-[40px] w-[40px] border-2 border-slate-400 p-2 hover:cursor-pointer md:h-[40px] md:w-[40px]"
                />
                <img
                    src={[back]}
                    alt="previous btn"
                    className="h-[40px] w-[40px] border-2 border-slate-400 p-2 hover:cursor-pointer md:h-[40px] md:w-[40px]"
                />
                <p className="h-[40px] w-[40px] border-2 border-slate-400 py-2 text-center font-bold hover:cursor-pointer md:h-[40px] md:w-[40px] md:font-normal">
                    1
                </p>
                <p className="h-[40px] w-[40px] border-2 border-slate-400 py-2 text-center font-bold hover:cursor-pointer md:h-[40px] md:w-[40px] md:font-normal">
                    2
                </p>
                <p className="h-[40px] w-[40px] border-2 border-slate-400 py-2 text-center font-bold hover:cursor-pointer md:h-[40px] md:w-[40px] md:font-normal">
                    3
                </p>
                <img
                    src={[forward]}
                    alt="previous btn"
                    className="h-[40px] w-[40px] border-2 border-slate-400 p-2 hover:cursor-pointer md:h-[40px] md:w-[40px]"
                />
                <img
                    src={[next]}
                    alt="previous btn"
                    className="h-[40px] w-[40px] border-2 border-slate-400 p-2 hover:cursor-pointer md:h-[40px] md:w-[40px]"
                />
            </div>
        </div>
    );
};

export default Pagination;
