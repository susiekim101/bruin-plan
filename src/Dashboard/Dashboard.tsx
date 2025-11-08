import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import Header from './Header/Header.tsx';
import Year from './Year/Year.tsx'



function Dashboard () {
    const [yearNum, setYearNum] = useState<number>(1);
    const handleLeftClick = () => setYearNum(yearNum-1);
    const handleRightClick = () => setYearNum(yearNum+1);

    return (
    <div className="w-full h-screen flex">
        <div className="w-full">
            <Header year={yearNum}/>
            <div>
                <div className="flex flex-row overflow-x-auto">
                    <button 
                        className="pl-0.5 pr-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleLeftClick}
                        disabled={yearNum <= 1}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <Year />
                    <button 
                        className="pr-0.5 pl-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleRightClick}
                        disabled={yearNum >= 4}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
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