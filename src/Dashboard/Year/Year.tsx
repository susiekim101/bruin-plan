import Quarters from './Quarters.tsx';

function Year() {
    return (
        <div className="flex flex-row overflow-x-auto space-x-0">
            <div className="flex flex-col items-center">
                <p className="text-black font-bold">Fall</p>
                <Quarters />
            </div>
            <div className="flex flex-col items-center">
                <p className="text-black font-bold">Winter</p>
                <Quarters />
            </div>
            <div className="flex flex-col items-center">
                <p className="text-black font-bold">Spring</p>
                <Quarters />
            </div>
            <div className="flex flex-col items-center">
                <p className="text-black font-bold">Summer</p>
                <Quarters />
            </div>
        </div>
    )
};


export default Year;