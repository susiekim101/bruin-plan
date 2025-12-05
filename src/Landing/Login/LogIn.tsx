import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import AuthenticationContext from '../../AuthenticationContext';
import { handleOpenDialog, handleCloseDialog, useValidateForm, handleInputChange, handleSubmit } from './LoginHandler';

interface UserData {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    major: string
};

interface LogInProps {
    textStyle: string,
    px: number,
    py: number
}

function LogIn({ textStyle, px, py }: LogInProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSignedUp, setSignUp] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        'first_name': '',
        'last_name': '',
        'email': '',
        'password': '',
        'major': '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const { login } = useContext(AuthenticationContext);

    useValidateForm(formRef, setIsFormValid);
    // useEffect(() => {
    //     const formEl = formRef.current;
    //     if(!formEl) return;

    //     const validatorInputs = Array.from(
    //         formEl.querySelectorAll('input.validator, select.validator')
    //     );

    //     const validate = () => {
    //         const allValid = validatorInputs.every(input => 
    //             (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) && input.checkValidity());
    //         setIsFormValid(allValid);
    //     }

    //     validatorInputs.forEach(input => {
    //         input.addEventListener('input', validate);
    //         input.addEventListener('change', validate);
    //         input.addEventListener('blur', validate);
    //     });

    //     validate();

    //     return () => {
    //         validatorInputs.forEach(input => {
    //             input.removeEventListener('input', validate);
    //             input.removeEventListener('change', validate);
    //             input.removeEventListener('blur', validate);
    //         });
    //     };
    // }, [signup])

    // function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    //     const { name, value } = e.target;
    //     setUserData((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    // async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    //     e.preventDefault();
    //     setError(null);
    //     if(!isFormValid) {
    //         console.log("Form is invalid");
    //         return;
    //     }
    //     const url: string = signup ? `http://localhost:3001/user/signup` : 'http://localhost:3001/user/login';

    //     tryLogInSignUp({ navigate, login, setError, url, userData});
        // try {
        //     await axios.post(url, userData, { withCredentials: true });
        //     navigate('/dashboard');
        //     login();
        //     return;
        // } catch (err) {
        //     if (axios.isAxiosError(err) && err.response && err.response.data === 'Existing email') {
        //         setError("Account already exists");
        //     } else {
        //         setError("User does not exist or incorrect credentials.");
        //     }
        //     console.error(`Failed to sign up/log in:`, err);
        // }
    // }

    return (
        <div className="">
            <dialog ref={dialogRef} className="p-0 border rounded-lg shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-500 backdrop:opacity-50">
                <form ref={formRef} onSubmit={(e) => handleSubmit({e, setError, isFormValid, isSignedUp, navigate, login, userData})} className="fieldset bg-base-200 border-base-300 rounded-box w-xs h-fit border p-4">
                    <header className="flex justify-between">
                        <legend className="text-lg" id="registration-title">{isSignedUp ? "Create Account" : "Log In"}</legend>
                        <X className="w-5 h-5 cursor-pointer" onClick={() => handleCloseDialog(dialogRef)}/>
                    </header>

                    {isSignedUp && (
                        <>
                            <label className="label">First Name</label>
                            <input id="first-name" type="text" className="input validator" placeholder="First Name" name="first_name" onChange={(e) => handleInputChange({e, setUserData})} required/>

                            <label className="label">Last Name</label>
                            <input id="last-name" type="text" className="input validator" placeholder="Last Name" name="last_name" onChange={(e) => handleInputChange({e, setUserData})} required/>
                        </>
                    )}

                    <label className="label">Email</label>
                    <input type="email" className="input validator" placeholder="test@example.com" name="email" onChange={(e) => handleInputChange({e, setUserData})} required/>

                    <label className="label">Password</label>
                    <input type="password" 
                            className="input validator peer" 
                            placeholder="Password" 
                            required minLength={8}
                            pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[?!*._]).{8,}"
                            name="password"
                            onChange={(e) => handleInputChange({e, setUserData})}/>
                    <p className="hidden validator-hint text-gray-700">
                        Must be more than 8 characters, including
                        <br/>At least one number
                        <br/>At least one lowercase letter
                        <br/>At least one uppercase letter
                        <br/>At least one special character from ?!*._
                    </p>

                    {isSignedUp && (
                        <>
                            <label className="label">Major</label>
                            <select id="major-input" defaultValue="" className="select validator" name="major" onChange={(e) => handleInputChange({e, setUserData})} required >
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
                            {isSignedUp ? "Create Account" : "Log In"}
                    </button>
                    
                    {error && (
                        <p className="text-red-500">{error}</p>
                    )}
                    <div className="flex gap-2 justify-center">
                        <p>{isSignedUp ? "Already have an account?" : "Don't have an account?"}</p>
                        <p className="cursor-pointer hover:underline" onClick={() => setSignUp(!isSignedUp)}>
                            {isSignedUp ? "Log in" : "Sign up"}
                        </p>
                    </div>
                </form>
            </dialog>

            <button 
                className={`px-${px} py-${py} cursor-pointer ${textStyle} font-semibold border-2 border-[#0353A4] rounded-xl text-[#0353A4] bg-white hover:bg-[#0353A4] hover:text-white transition`}
                onClick={() => handleOpenDialog(navigate, dialogRef)} 
                id="my-dashboard"
            >
                My Dashboard
            </button>
        </div>
    );
}

export default LogIn