import { Link } from "react-router-dom";
import LogIn from "./LogIn/LogIn";

function Landing() {

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1>Bruin Plan</h1>
            <LogIn/>
            <nav>
                <Link to='/dashboard'>Dashboard</Link>
            </nav>
        </div>
    );
}

export default Landing;