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
        <div className="w-4/5">
            <Header year={yearNum}/>
            <div>
                <div className="flex flex-row items-stretch w-full">
                    <button 
                        className="pl-0.5 pr-0 disabled:opacity-0 disabled:cursor-default"
                        disabled={yearNum <= 1}>
                        <ChevronLeft className="size-10 cursor-pointer" onClick={handleLeftClick}/>
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
                        disabled={yearNum >= 4}>
                        <ChevronRight className="size-10 cursor-pointer" onClick={handleRightClick}/>
                    </button>
                </div>
            </div>
                
        </div>
        <div className="w-1/5">
            <Sidebar />
        </div>
    </div>
    )
}


export default Dashboard;