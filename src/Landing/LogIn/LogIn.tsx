import { useRef } from 'react';
import { X } from 'lucide-react';

function LogIn() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    function handleOpenClick() {
        // TODO: HANDLE CLICK FOR LOG IN. CREATE DIALOG.
        if(dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    function handleCloseClick() {
        if(dialogRef.current) {
            dialogRef.current.close();
        }
    }

    return (
        <div className="border border-black">
            <dialog ref={dialogRef} className="p-0 rounded-lg shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs h-fit border p-4">
                    <header className="flex justify-between">
                        <legend className="text-lg">Create Account</legend>
                        <X className="w-5 h-5 cursor-pointer" onClick={handleCloseClick}/>
                    </header>

                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" />

                    <button className="btn btn-neutral mt-4">Create Account</button>
                </fieldset>
            </dialog>

            <button className="w-fit h-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800 cursor-pointer" onClick={handleOpenClick}>My Dashboard</button>
        </div>
    );
}

export default LogIn