import LogIn from '../Landing/Login/LogIn';

function Public() {

    return (
    <div className="p-3 flex flex-col gap-3 justify-center items-center">
        <div className="w-full flex justify-end border border-black">
            <LogIn textStyle='text-xs' px={2} py={1}/>
        </div>

        <div className="border border-black flex flex-col justify-center items-center gap-1">
            <h2 className="text-3xl">Browse Plans</h2>
            <p className="text-lg">Explore sample four year plans made by fellow Bruins!</p>
        </div>

        <select id="filter-major" name="filter-major" className="w-xs border border-black">
            <option selected>Filter by major</option>
            <option value="Bioengineering">Bionengineering</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
        </select>
    </div>
    );
}

export default Public;