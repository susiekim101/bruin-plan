import { CodeXml } from 'lucide-react';
import { useRef } from 'react';
import FullPlan from './FullPlan';

interface PlanCardProps {
    "major": string
}

function PlanCard( { major }: PlanCardProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleOpenClick = () => {
        if(dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    const handleCloseClick = () => {
        if(dialogRef.current) {
            dialogRef.current.close();
        }
    }
    return (
        <>
            <div className="p-2 flex flex-col justify-between items-center rounded-xl gap-3 bg-blue-800 transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={handleOpenClick}>
                <div className="flex justify-center items-center aspect-square border border-black rounded-xl w-full bg-gray-100">
                    <CodeXml className="w-15 h-15 text-yellow-500"/>
                </div>

                <div>
                    <p className="text-white text-center">{major}</p>
                </div>
            </div>

            <dialog ref={dialogRef}>
                <FullPlan handleCloseClick={handleCloseClick}/>
            </dialog>
        </>
    );
};

export default PlanCard;