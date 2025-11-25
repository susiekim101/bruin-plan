import LogIn from '../Landing/Login/LogIn';
import PlanCard from './components/PlanCard';
import { useNavigate } from 'react-router-dom';
import { House } from 'lucide-react';
import PlanCardGrid from './components/PlanCardGrid';

function Public() {
    const navigate = useNavigate();

    const dummyData = [
        { userId: 1, major: "Computer Science"},
        { userId: 2, major: "Bioenegineering"},
        { userId: 3, major: "Computer Science and Engineering"},
        { userId: 4, major: "Computer Engineering"},
        { userId: 5, major: "Computer Science"},
    ]
    return (
    <div className="p-3 flex flex-col gap-3 justify-center items-center">
        <div className="w-full flex justify-between">
            <House className="cursor-pointer" onClick={() => navigate('/')}/>

            <LogIn textStyle='text-xs' px={2} py={1}/>
        </div>

        <div className="flex flex-col my-5 justify-center items-center gap-1">
            <h2 className="text-3xl">Browse Plans</h2>
            <p className="text-lg">Explore sample four year plans made by fellow Bruins!</p>
        </div>

        <div className="flex flex-col mt-10 gap-1 justify-center items-center">
            <label className="text-sm">Filter plans by major</label>
            <select id="filter-major" name="filter-major" className="w-2xs text-sm border border-gray-500 rounded-md">
                <option selected>Select a major</option>
                <option value="Bioengineering">Bionengineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
            </select>
        </div>

        <div className="mx-30 w-100% border border-black">
            <PlanCardGrid planCards={dummyData}/>
            <PlanCard major="Computer Science"/>
        </div>
    </div>
    );
}

export default Public;