import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';

function LogIn() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [signup, setSignUp] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const formEl = formRef.current;
        if(!formEl) return;

        const validatorInputs = Array.from(
            formEl.querySelectorAll('input.validator, select.validator')
        );

        const validate = () => {
            const allValid = validatorInputs.every(input => 
                (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) && input.checkValidity());
            setIsFormValid(allValid);
        }

        validatorInputs.forEach(input => {
            input.addEventListener('input', validate);
            input.addEventListener('change', validate);
            input.addEventListener('blur', validate);
        });

        validate();

        return () => {
            validatorInputs.forEach(input => {
                input.removeEventListener('input', validate);
                input.removeEventListener('change', validate);
                input.removeEventListener('blur', validate);
            });
        };
    }, [signup])

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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if(!isFormValid) {
            console.log("Form is invalid");
            return;
        }
        console.log("Form will be submitted.");
    }
    return (
        <div className="">
            <dialog ref={dialogRef} className="p-0 rounded-lg shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form ref={formRef} onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs h-fit border p-4">
                    <header className="flex justify-between">
                        <legend className="text-lg" id="registration-title">{signup ? "Create Account" : "Log In"}</legend>
                        <X className="w-5 h-5 cursor-pointer" onClick={handleCloseClick}/>
                    </header>

                    {signup && (
                        <>
                            <label className="label">First Name</label>
                            <input id="first-name" type="text" className="input validator" placeholder="First Name" required/>

                            <label className="label">Last Name</label>
                            <input id="last-name" type="text" className="input validator" placeholder="Last Name" required/>
                        </>
                    )}

                    <label className="label">Email</label>
                    <input type="email" className="input validator" placeholder="test@example.com" required/>

                    <label className="label">Password</label>
                    <input type="password" 
                            className="input validator peer" 
                            placeholder="Password" 
                            required minLength={8}
                            pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[?!*._]).{8,}"/>
                    <p className="hidden validator-hint text-gray-700">
                        Must be more than 8 characters, including
                        <br/>At least one number
                        <br/>At least one lowercase letter
                        <br/>At least one uppercase letter
                        <br/>At least one special character from ?!*._
                    </p>

                    {signup && (
                        <>
                            <label className="label">Major</label>
                            <select id="major-input" defaultValue="" className="select validator" required >
                                <option disabled value="">Select your major</option>
                                <option>Bioengineering</option>
                                <option>Computer Science</option>
                                <option>Computer Science and Engineering</option>
                                <option>Computer Engineering</option>
                            </select>
                        </>
                    )}
                    
                    <button className="btn btn-neutral mt-4" 
                            type="submit"
                            disabled={!isFormValid}
                    >
                            {signup ? "Create Account" : "Log In"}
                    </button>

                    <div className="flex gap-2 justify-center">
                        <p>{signup ? "Already have an account?" : "Don't have an account?"}</p>
                        <p className="cursor-pointer" onClick={() => setSignUp(!signup)}>
                            {signup ? "Log in" : "Sign up"}
                        </p>
                    </div>
                </form>
            </dialog>

            <button 
                className="w-fit h-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800 cursor-pointer" 
                onClick={handleOpenClick} 
                id="my-dashboard"
            >
                My Dashboard
            </button>
        </div>
    );
}

export default LogIn