import LogIn from "./LogIn/LogIn";
function Landing() {

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1>Bruin Plan</h1>
            <LogIn/>
        </div>
    );
}

export default Landing;