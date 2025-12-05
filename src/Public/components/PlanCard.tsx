import { useRef } from 'react';
import FullPlan from './FullPlan';
import { handleOpenClick, handleCloseClick, majorIcon } from './PublicCardHandler';

interface PlanCardProps {
    plan_id: number,
    major: string
}

function PlanCard( { plan_id, major }: PlanCardProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <div className="h-full flex flex-col p-2 rounded-xl gap-2 bg-blue-800 transition-transform duration-300 hover:scale-[1.05] cursor-pointer"
                onClick={() => handleOpenClick(dialogRef)}>
                <div className="flex justify-center items-center aspect-square rounded-xl w-full bg-blue-200">
                    { majorIcon(major) }
                </div>

                <div className="h-full flex flex-col text-center justify-center">
                    <p className="text-white">{major}</p>
                </div>
            </div>

            <dialog ref={dialogRef}>
                <FullPlan plan_id={plan_id} handleCloseClick={() => handleCloseClick(dialogRef)}/>
            </dialog>
        </>
    );
};

export default PlanCard;