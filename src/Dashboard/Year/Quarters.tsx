import CourseCard from "../components/CourseCards/CourseCards";
import CustomCard from "../components/CourseCards/CustomCards";


function Quarters() {
    const handleDragOver = (container: React.DragEvent<HTMLDivElement>) => {
        container.preventDefault();
    };

    const handleDrop = (container: React.DragEvent<HTMLDivElement>) => {
        container.preventDefault();
    }


    return(
        <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex flex-col w-full justify-between bg-zinc-200 h-[calc(100vh-8em)] m-3 mt-0.5 rounded-3xl p-4">
            <div className="flex flex-col shrink space-y-2">

            </div>
            
            <div className="flex flex-col justify-center items-center mt-0.5">
                <button className="flex justify-center items-center bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-2 text-xs rounded-full w-fit mt-4 mb-0.5 whitespace-nowrap"
                    onClick={changeClassStatus}>
                    Mark all as
                </button>
                <p className="text-black font-bold">
                    Units: 15
                </p>
            </div>
        </div>
    );
}
export default Quarters;

function changeClassStatus() {

};