import Quarters from './Quarters.tsx';

type yearProps = {
    yearIndex: number;
}

function Year({yearIndex} : yearProps) {
    return (
        <div className="flex flex-row shrink w-full overflow-x-auto gap-x-3">
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Fall</p>
                <Quarters yearIndex={yearIndex} quarterName={"Fall"}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Winter</p>
                <Quarters yearIndex={yearIndex} quarterName={"Winter"}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Spring</p>
                <Quarters yearIndex={yearIndex} quarterName={"Spring"}/>
            </div>
            <div className="flex flex-col flex-1 items-center shrink">
                <p className="text-black font-bold">Summer</p>
                <Quarters yearIndex={yearIndex} quarterName={"Summer"}/>
            </div>
        </div>
    )
};

export default Year;