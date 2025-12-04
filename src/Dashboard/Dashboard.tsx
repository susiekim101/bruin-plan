import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar.tsx';
import Header from './Header/Header.tsx';
import Year from './Year/Year.tsx'
import axios from 'axios';
import { ChevronLeft, ChevronRight, LogOut, House } from "lucide-react";
import { useContext } from 'react';
import AuthenticationContext from '../AuthenticationContext.tsx';
import type { Course } from './types.ts';

function Dashboard () {
    const [yearNum, setYearNum] = useState<number>(1);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const handleLeftClick = () => setYearNum(yearNum-1);
    const handleRightClick = () => setYearNum(yearNum+1);
    const navigate = useNavigate();
    const { logout } = useContext(AuthenticationContext);
    const [userId, setUserId] = useState<number | null>(null);
    const [allCourses, setAllCourses] = useState<{ [key: string]: Course[] }>({});
    const [totalUnits, setTotalUnits] = useState<number>(0); 
    const [ courses, setCourses ] = useState<Course[]>([]);
    const [ filteredCourses, setFilteredCourses ] = useState<Course[]>([]);
    const MIN_UNITS = 30;


    useEffect(() => {
        localStorage.setItem('MIN_UNITS', `${MIN_UNITS}`);

        // Valdiate user's tokens before logging in
        const userVerification = async () => {
            if(localStorage.getItem('loggedIn') == 'false') {
                navigate('/');
                return;
            }
            try {
                await axios.get('http://localhost:3001/user/verifyUser', { withCredentials: true });
            } catch (err) {
                console.log("User unverified. ", err);
                localStorage.setItem('loggedIn', 'false');
                navigate('/');
            }
        }
        userVerification();
    }, [navigate]);

    useEffect(() => {
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId === null) return; 
        for (let year = 1; year <= 4; year++) {
            for (const quarter of ["Fall", "Winter", "Spring", "Summer"] as const) {
                loadQuarterCourses(year, quarter);
            }
        }
    }, [userId]);

    useEffect(() => {
        let total = 0;
        for (let year = 1; year <= 4; year++) {
            for (const quarter of ["Fall", "Winter", "Spring", "Summer"] as const) {
                const courses = allCourses[`${year}-${quarter}`] || [];
                total += courses.reduce((sum, course) => sum + course.course_units, 0);
            }
        }
        setTotalUnits(total);
    }, [allCourses]);

    const handleOpenClick = () => {
        if(dialogRef.current)
            dialogRef.current.showModal();
    }

    const handleCloseClick = () => {
        if(dialogRef.current)
            dialogRef.current.close();
    }

    const handleLogOut = async () => {
        try {
            logout();
            await axios.post('http://localhost:3001/user/logout', { withCredentials: true});
        } catch (err) {
            console.error("Failed to log out, ", err);
        }
        navigate('/');
    }

    const handleHome = async() => {
        navigate('/');
    }

    const fetchUserId = async () => {
        try {
            const res = await axios.get("http://localhost:3001/user/userId", {
                withCredentials: true
            });
            setUserId(res.data.user_id);
        } catch (err) {
            console.error("Failed to get user ID:", err);
            navigate('/');
        }
    };

    const removeFromSidebar = (courseId: number) => {
        setCourses(prev => prev.filter(c => c.course_id !== courseId));
        setFilteredCourses(prev => prev.filter(c => c.course_id !== courseId));
    };

    async function loadQuarterCourses (year: number, quarter: 'Fall' | 'Winter' | 'Spring' | 'Summer') {
        if (!userId) {
            return;
        }
        try {
            const userData = {
                userId: userId,
                yearIndex: year,
                quarterName: quarter
            };
            const result = await axios.post(`http://localhost:3001/quarter/getCourses`, userData);
            setAllCourses(prev => ({
                ...prev,
                [`${year}-${quarter}`]: result.data.allCourses,
            }));
        } catch (err) {
            console.error("Failed to load courses:", err);
        }
    };
    
    return (
    <div className="w-full h-screen flex">
        <dialog ref={dialogRef} className="py-5 p-10 text-center bg-cyan-700 text-white rounded-lg shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-500 backdrop:opacity-50">
            <p className="text-xl font-bold mb-5">Log out?</p>
            <button onClick={handleCloseClick} className="bg-yellow-400 rounded-2xl px-2 py-1 mr-5 cursor-pointer text-slate-700 transition duration-300 hover:bg-red-500 hover:scale-105">Cancel</button>
            <button onClick={handleLogOut} className="bg-yellow-400 rounded-2xl px-2 py-1 mr-5 cursor-pointer text-slate-700 transition duration-300 hover:bg-green-500 hover:scale-105">Yes</button>
        </dialog>
        <div className="w-4/5">
            <div className="flex justify-between mx-3 mt-3 mb-2">
            <House className="cursor-pointer transition duration-300 hover:scale-110" onClick={handleHome}/>
            <LogOut className="cursor-pointer transition duration-300 hover:scale-110" onClick={handleOpenClick}/>
            </div>
            <Header totalUnits={totalUnits} year={yearNum} userId={userId}/>
            <div>
                <div className="flex flex-row items-stretch w-full">
                    <button 
                        className="pl-0.5 pr-0 disabled:pointer-events-none" disabled={yearNum <= 1}>
                        <ChevronLeft 
                            className={`size-10 cursor-pointer ${yearNum <= 1 ? 'invisible pointer-events-none' : ''}`} 
                            onClick={handleLeftClick} 
                            id="left-navigation"/>
                    </button>
                    <div className="relative w-full overflow-hidden flex justify-center">
                        <div className="flex transition-transform duration-400 ease-in-out w-full"
                            style={{transform: `translateX(-${yearNum * 100}%)` }}
                            id="plan-container">
                            {[...Array(5)].map((_, idx) => (
                            <div
                                key={idx}
                                className="w-full shrink-0 flex justify-center items-start"
                            >
                                <div className="flex grow min-w-1/4">
                                    <Year userId={userId} yearIndex={yearNum} allCourses={allCourses} removeFromSidebar={removeFromSidebar} loadCourses={loadQuarterCourses}/>
                                </div>
                            </div>
                        ))}</div>
                    </div>
                    <button 
                        className="pr-0.5 pl-0 disabled:pointer-events-none" disabled={yearNum >= 4}>
                        <ChevronRight 
                            className={`size-10 cursor-pointer ${yearNum >= 4 ? 'invisible pointer-events-none' : ''}`}
                            onClick={handleRightClick} 
                            id="right-navigation"/>
                    </button>
                </div>
            </div>
                
        </div>
        <div className="w-full">
            <Sidebar userId={userId} courses={courses} setCourses={setCourses} filteredCourses={filteredCourses} setFilteredCourses={setFilteredCourses} loadQuarterCourses={loadQuarterCourses} /> 
        </div>
    </div>
    )
}


export default Dashboard;