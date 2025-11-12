import { useRef, useState } from 'react';
import { X } from 'lucide-react';

function LogIn() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [signup, setSignUp] = useState(true);

    function handleOpenClick() {
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
        <div className="">
            <dialog ref={dialogRef} className="p-0 rounded-lg shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs h-fit border p-4">
                    <header className="flex justify-between">
                        
                        <legend className="text-lg" id="registration-title">{signup ? "Create Account" : "Log In"}</legend>
                        <X className="w-5 h-5 cursor-pointer" onClick={handleCloseClick}/>
                    </header>

                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" />

                    {signup && 
                    <>
                        <label className="label">Major</label>
                        <select id="major-input" defaultValue="Select your major" className="select">
                            <option disabled={true}>Select your major</option>
                            <option>Bioengineering</option>
                            <option>Computer Science</option>
                            <option>Computer Science and Engineering</option>
                            <option>Computer Engineering</option>
                        </select>
                    </>}
                    
                    <button className="btn btn-neutral mt-4">{signup ? "Create Account" : "Log In"}</button>
                    <div className="flex gap-2 justify-center">
                        <p>{signup ? "Already have an account?" : "Don't have an account?"}</p>
                        <p className="cursor-pointer" onClick={() => setSignUp(!signup)}>{signup ? "Log in" : "Sign up"}</p>
                    </div>
                </fieldset>
            </dialog>

            <button className="w-fit h-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800 cursor-pointer" onClick={handleOpenClick} id="my-dashboard">My Dashboard</button>
        </div>
    );
}

export default LogIn