import { useNavigate } from "react-router-dom";
export default function ViewAll() {
    const navigate = useNavigate();

    function handleClick() {
        console.log("View All button clicked")
        navigate('/public');
    } 

    return (
        <div>
            <button onClick={handleClick}
                    className="w-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800 transition duration-300 hover:scale-110">View All</button>
        </div>
    );
}