import Card from "../components/CourseCards/Card";


function Quarters() {
    return(
        <div className="flex flex-col w-1/4 overflow-x-auto justify-between bg-zinc-200 h-[calc(100vh-8em)] m-4 rounded-3xl p-4 overflow-scroll">
            <div className="w-auto space-y-2">
                <Card units={5} courseName="CS 35L" courseTitle="Software Engineering Lab"/>
                <Card units={5} courseName="CS 130" courseTitle="Computer Architecture"/>
                <Card />
                <Card />
            </div>

            <button className="flex mx-auto justify-center items-center bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-2 text-xs rounded-full w-fit mt-4 mb-0.5">
                Mark all as
            </button>
            
            
            <div className="flex justify-center items-center mt-0.5">
                <p className="text-black font-bold">
                    Units: 15
                </p>
            </div>
        </div>
    );
}
export default Quarters;