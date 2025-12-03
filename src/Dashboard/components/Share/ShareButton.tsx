import { useRef } from 'react';
import { handleClick, handleOpenClick, handleCloseClick, handleCloseConfirmation } from "./ShareButtonHandlers"
interface ShareButtonProps {
    units: number
}

export default function ShareButton({units}: ShareButtonProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const confirmationRef = useRef<HTMLDialogElement>(null);
    const MIN_UNITS = Number(localStorage.getItem('MIN_UNITS'));

    return (
        <div>

            <dialog ref={confirmationRef} className="p-3 w-[30%] text-center bg-cyan-700 text-white rounded-lg shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-500 backdrop:opacity-50">
                <p className="text-xl font-bold">Your plan has been successfully published!</p>
                <p className="m-3">If you make updates to your plan on your dashboard, the changes will not be reflected unless you share again.</p>
                <button onClick={() => handleCloseConfirmation(confirmationRef)} className="bg-yellow-400 rounded-2xl px-2 py-1 cursor-pointer text-slate-700">Close</button>
            </dialog>

            <dialog ref={dialogRef} className="p-3 w-[30%] text-center bg-cyan-700 text-white rounded-lg shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-500 backdrop:opacity-50">
                <p className="text-xl font-bold">Check your units!</p>
                <p className="m-3"> Your 4-year plan must meet the minimum unit requirement of {MIN_UNITS} units before posting publicly.</p>
                <button onClick={() => handleCloseClick(dialogRef)} className="bg-yellow-400 rounded-2xl px-2 py-1 cursor-pointer text-slate-700">Close</button>
            </dialog>

            <button onClick={units >= MIN_UNITS ? () => handleClick(confirmationRef) : () => handleOpenClick(dialogRef)} className="w-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800 cursor-pointer transition duration-300 hover:scale-110">Share</button>
        </div>
    )
}