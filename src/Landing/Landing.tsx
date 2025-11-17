import { Link } from "react-router-dom";
import LogIn from "./Login/LogIn";
import bear from "../assets/bear.png";

function Landing() {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-[#709DCB] via-[#AFC6E6] to-white flex justify-center items-start overflow-hidden relative">

            {/* Wave at the bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    className="w-full h-32" 
                    style={{ transform: 'rotate(180deg)' }}
                >
                    <path 
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                        fill="#97B8D9" 
                        opacity="1"
                    ></path>
                </svg>
            </div>

            <div className="w-11/12 max-w-7xl flex pt-16">

                {/* LEFT SIDE – FULL OUTER TABLE */}
                <div className="w-1/2 flex flex-col relative">

                    {/* OUTER ROUNDED RECTANGLE */}
                    <div className="
                        w-full 
                        rounded-[30px]
                        overflow-hidden
                        shadow-[0_10px_40px_rgba(0,0,0,0.15)]
                        h-[600px]
                        bg-gradient-to-b from-[#3E7BB9] via-[#4F7BBF]/20 to-transparent
                        relative
                    ">

                        {/* DARK BLUE GRADIENT HEADER */}
                        <div className="
                            w-full h-14 
                            bg-[#3E7BB9]
                            flex items-center px-10
                        ">
                            <div className="grid grid-cols-3 w-full text-center">
                                <p className="text-2xl font-semibold text-[#1962AC]">Year 1</p>
                                <p className="text-2xl font-semibold text-[#1962AC]">Year 2</p>
                                <p className="text-2xl font-semibold text-[#1962AC]">Year 3</p>
                            </div>
                        </div>

                        {/* TOP DIVIDER LINE */}
                        <div className="w-full h-[2px] bg-[#1E4C8F]/60"></div>

                        {/* VERTICAL LINES - POSITIONED ABSOLUTELY TO SPAN ENTIRE HEIGHT */}
                        <div className="absolute top-14 left-1/3 w-[2px] h-[calc(100%-56px)] bg-gradient-to-b from-[#1E4C8F]/40 to-[#1E4C8F]/10"></div>
                        <div className="absolute top-14 left-2/3 w-[2px] h-[calc(100%-56px)] bg-gradient-to-b from-[#1E4C8F]/40 to-[#1E4C8F]/10"></div>

                        {/* CONTENT AREA */}
                        <div className="flex w-full py-10 h-[500px]">

                            {["Year 1", "Year 2", "Year 3"].map((year, i) => (
                                <div key={year} className="flex-1 relative flex flex-col items-center">

                                    {/* INNER ROUNDED CARD */}
                                    <div className="
                                        bg-[#3E7BB9]/35
                                        w-[75%]
                                        h-32
                                        rounded-3xl
                                        shadow-md
                                        flex flex-col justify-center gap-3
                                        px-6
                                        mt-2
                                    ">
                                        {/* Two text bars */}
                                        <div className="w-1/2 h-3 bg-[#1962AC]/30 rounded-md"></div>
                                        <div className="w-5/6 h-3 bg-[#1962AC]/30 rounded-md"></div>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* TEXT AND BUTTONS*/}
                    <div className="absolute top-60 left-8"> 
                        <h1 className="text-5xl font-bold text-black leading-tight">
                            Welcome to <br />
                            <span className="text-6xl font-extrabold">Bruin Plan</span>
                        </h1>
                        <p className="text-lg text-[#354B78] mt-2">
                            Build your perfect 4-year plan with ease
                        </p>

                        {/* BUTTONS */}
                        <div className="flex gap-4 mt-8">
                            {/* My Dashboard (white) */}
                            <Link
                                to="/dashboard"
                                className="px-6 py-3 text-lg font-semibold border-2 border-[#0353A4] rounded-xl text-[#0353A4] bg-white hover:bg-[#0353A4] hover:text-white transition"
                            >
                                My Dashboard
                            </Link>

                            {/* Log In (blue) */}
                            <button
                                onClick={() => document.getElementById("my-dashboard")?.click()}
                                className="px-6 py-3 text-lg font-semibold border-2 border-[#0353A4] rounded-xl text-white bg-[#0353A4] hover:bg-[#023D7E] transition"
                            >
                                Log In
                            </button>
                        </div>
                    </div>

                    {/* Hidden LogIn component but functional modal */}
                    <div className="hidden">
                        <LogIn />
                    </div>

                </div>

                {/* RIGHT SIDE — BEAR */}
                <div className="w-1/2 flex justify-center items-center -mt-16"> 
                    <img 
                        src={bear}
                        alt="bear"
                        className="w-[700px] drop-shadow-xl"
                    />
                </div>

            </div>
        </div>
    );
}

export default Landing;