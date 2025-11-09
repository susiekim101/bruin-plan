import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import Header from './Header/Header.tsx';
import Year from './Year/Year.tsx'
import { ChevronLeft, ChevronRight } from "lucide-react";


function Dashboard () {
    const [yearNum, setYearNum] = useState<number>(1);
    const handleLeftClick = () => setYearNum(yearNum-1);
    const handleRightClick = () => setYearNum(yearNum+1);

    return (
    <div className="w-full h-screen flex">
        <div className="w-full">
            <Header year={yearNum}/>
            <div>
                <div className="flex flex-row items-stretch w-full">
                    <button 
                        className="pl-0.5 pr-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleLeftClick}
                        disabled={yearNum <= 1}> 
                        <ChevronLeft className="size-10"/>
                    </button>
                    <div className="flex grow min-w-1/4">
                        <Year />
                    </div>
                    <button 
                        className="pr-0.5 pl-0 disabled:opacity-50 disabled:cursor-not-allowed"
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