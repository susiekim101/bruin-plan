import Quarters from './Quarters.tsx';

function Year() {
    return (
        <div className="flex flex-row shrink w-full overflow-x-auto gap-x-3">
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Fall</p>
                <Quarters />
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Winter</p>
                <Quarters />
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Spring</p>
                <Quarters />
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Summer</p>
                <Quarters />
            </div>
        </div>
    )
};

export default Year;