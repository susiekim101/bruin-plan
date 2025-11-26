import { CodeXml, Microscope, MonitorCog, Computer } from 'lucide-react';
import { useRef, type ReactElement } from 'react';
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

    const majorIcon: () => ReactElement = () => {
        switch (major) {
            case "Bioengineering":
                return <Microscope className="w-15 h-15 text-yellow-500"/>
            case "Computer Science":
                return <CodeXml className="w-15 h-15 text-yellow-500"/>
            case "Computer Engineering":
                return <MonitorCog className="w-15 h-15 text-yellow-500"/>
            case "Computer Science and Engineering":
                return <Computer className="w-15 h-15 text-yellow-500"/>
            default:
                return <></>
        }
    }

    return (
        <>
            <div className="h-full flex flex-col p-2 rounded-xl gap-2 bg-blue-800 transition-transform duration-300 hover:scale-[1.05] cursor-pointer"
                onClick={handleOpenClick}>
                <div className="flex justify-center items-center aspect-square rounded-xl w-full bg-gray-100">
                    { majorIcon() }
                </div>

                <div className="h-full flex flex-col text-center justify-center">
                    <p className="text-white">{major}</p>
                </div>
            </div>

            <dialog ref={dialogRef}>
                <FullPlan handleCloseClick={handleCloseClick}/>
            </dialog>
        </>
    );
};

export default PlanCard;