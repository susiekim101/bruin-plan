import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar.tsx';
import Header from './Header/Header.tsx';
import Year from './Year/Year.tsx'
import axios from 'axios';
import { ChevronLeft, ChevronRight, LogOut, House } from "lucide-react";
import { useContext } from 'react';
import AuthenticationContext from '../AuthenticationContext.tsx';
import {useVerifyUser, useFetchUserId, useLoadCourses, useSetTotalUnits, handleOpenClick, handleCloseClick, handleLogOut, handleHome, handleLeftClick, handleRightClick } from './DashboardHandler.tsx';

interface Course {
    course_id: number | null;
    course_number: string;
    course_name: string;
    course_units: number;
    status: 'Planned' | 'In Progress' | 'Completed';
    category: string;
    major_id: number;
}

function Dashboard () {
    const [yearNum, setYearNum] = useState<number>(1);
    const [userId, setUserId] = useState<number | null>(null);
    const [allCourses, setAllCourses] = useState<{ [key: string]: Course[] }>({});
    const [totalUnits, setTotalUnits] = useState<number>(0); 
    const [ courses, setCourses ] = useState<Course[]>([]);
    const [ filteredCourses, setFilteredCourses ] = useState<Course[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { logout } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const MIN_UNITS = 30;

    useVerifyUser(navigate, MIN_UNITS);
    useFetchUserId(navigate, setUserId);
    useLoadCourses({userId, loadQuarterCourses});
    useSetTotalUnits({allCourses, setTotalUnits})

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
            <button onClick={() => handleCloseClick(dialogRef)} className="bg-yellow-400 rounded-2xl px-2 py-1 mr-5 cursor-pointer text-slate-700 transition duration-300 hover:bg-red-500 hover:scale-105">Cancel</button>
            <button onClick={() => handleLogOut(logout, navigate)} className="bg-yellow-400 rounded-2xl px-2 py-1 mr-5 cursor-pointer text-slate-700 transition duration-300 hover:bg-green-500 hover:scale-105">Yes</button>
        </dialog>
        <div className="w-4/5">
            <div className="flex justify-between mx-3 mt-3 mb-2">
            <House className="cursor-pointer transition duration-300 hover:scale-110" onClick={() => handleHome(navigate)}/>
            <LogOut className="cursor-pointer transition duration-300 hover:scale-110" onClick={() => handleOpenClick(dialogRef)}/>
            </div>
            <Header totalUnits={totalUnits} year={yearNum}/>
            <div>
                <div className="flex flex-row items-stretch w-full">
                    <button 
                        className="pl-0.5 pr-0 disabled:pointer-events-none" disabled={yearNum <= 1}>
                        <ChevronLeft 
                            className={`size-10 cursor-pointer ${yearNum <= 1 ? 'invisible pointer-events-none' : ''}`} 
                            onClick={() => handleLeftClick(setYearNum)} 
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
                            onClick={() => handleRightClick(setYearNum)} 
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