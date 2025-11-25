import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar.tsx';
import Header from './Header/Header.tsx';
import Year from './Year/Year.tsx'
import axios from 'axios';
import { ChevronLeft, ChevronRight, LogOut, House } from "lucide-react";
import { useContext } from 'react';
import AuthenticationContext from '../AuthenticationContext.tsx';

function Dashboard () {
    const [yearNum, setYearNum] = useState<number>(1);
    const handleLeftClick = () => setYearNum(yearNum-1);
    const handleRightClick = () => setYearNum(yearNum+1);
    const navigate = useNavigate();
    const { logout } = useContext(AuthenticationContext);

    useEffect(() => {
        // Valdiate user's tokens before logging in
        const userVerification = async () => {
            try {
                await axios.get('http://localhost:3001/user/verifyUser', { withCredentials: true });
            } catch (err) {
                console.log("User unverified. ", err);
                navigate('/');
            }
        }
        userVerification();
    }, [navigate]);


    const handleLogOut = async () => {
        try {
            await axios.post('http://localhost:3001/user/logout', { withCredentials: true});
        } catch (err) {
            console.error("Failed to log out, ", err);
        }
        logout();
        navigate('/');
    }

    const handleHome = async() => {
        navigate('/');
    }
    
    return (
    <div className="w-full h-screen flex">
        <div className="w-4/5">
            <div className="flex justify-between mx-3 mt-3 mb-2">
            <House className="cursor-pointer" onClick={handleHome}/>
            <LogOut className="cursor-pointer" onClick={handleLogOut}/>
            </div>
            <Header year={yearNum}/>
            <div>
                <div className="flex flex-row items-stretch w-full">
                    <button 
                        className="pl-0.5 pr-0 disabled:opacity-0"
                        onClick={handleLeftClick}
                        disabled={yearNum <= 1}> 
                        <ChevronLeft className="size-10"/>
                    </button>
                    <div className="relative w-full overflow-hidden flex justify-center">
                        <div className="flex transition-transform duration-400 ease-in-out w-full"
                            style={{transform: `translateX(-${yearNum * 100}%)` }}>
                            {[...Array(5)].map((_, idx) => (
                            <div
                                key={idx}
                                className="w-full shrink-0 flex justify-center items-start"
                            >
                                <div className="flex grow min-w-1/4">
                                    <Year />
                                </div>
                            </div>
                        ))}</div>
                    </div>
                    <button 
                        className="pr-0.5 pl-0 disabled:opacity-0"
                        onClick={handleRightClick}
                        disabled={yearNum >= 4}>
                        <ChevronRight className="size-10"/>
                    </button>
                </div>
            </div>
                
        </div>
        <div>
            <Sidebar /> 
        </div>
    </div>
    )
}


export default Dashboard;