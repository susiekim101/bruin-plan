import axios from 'axios';
import { useRef } from 'react';
interface ShareButtonProps {
    units: number
}

export default function ShareButton({units}: ShareButtonProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const confirmationRef = useRef<HTMLDialogElement>(null);

    async function handleClick() {
        try{
            // console.log("Processing user_plan");
            const response = await axios.get(`http://localhost:3001/user/currUserId`, { withCredentials: true});
            const user_id = response.data.user_id;
            // console.log("user_id is: ", user_id);
            await axios.post(`http://localhost:3001/plan/shareplan/${user_id}`, { withCredentials: true});
            // console.log("User plan shared");
            if(confirmationRef.current)
                confirmationRef.current.showModal();
        } catch {
            console.error("Failed to share user plan");
        }
    }

    async function handleOpenClick() {
        if(dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    async function handleCloseClick() {
        if(dialogRef.current) {
            dialogRef.current.close();
        }
    }

    async function handleCloseConfirmation() {
        if(confirmationRef.current) {
            confirmationRef.current.close();
        }
    }

    return (
        <div>

            <dialog ref={confirmationRef} className="p-3 w-[30%] text-center bg-cyan-700 text-white rounded-lg shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-500 backdrop:opacity-50">
                <p className="text-xl font-bold">Your plan has been successfully published!</p>
                <p className="m-3">If you make updates to your plan on your dashboard, the changes will not be reflected unless you share again.</p>
                <button onClick={handleCloseConfirmation} className="bg-yellow-400 rounded-2xl px-2 py-1 cursor-pointer text-slate-700">Close</button>
            </dialog>

            <dialog ref={dialogRef} className="p-3 w-[30%] text-center bg-cyan-700 text-white rounded-lg shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-500 backdrop:opacity-50">
                <p className="text-xl font-bold">Check your units!</p>
                <p className="m-3"> Your 4-year plan must meet the minimum unit requirement of 180 units before posting publicly.</p>
                <button onClick={handleCloseClick} className="bg-yellow-400 rounded-2xl px-2 py-1 cursor-pointer text-slate-700">Close</button>
            </dialog>

            <button onClick={units >= 180 ? handleClick : handleOpenClick} className="w-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800 cursor-pointer transition duration-300 hover:scale-110">Share</button>
        </div>
    )
}