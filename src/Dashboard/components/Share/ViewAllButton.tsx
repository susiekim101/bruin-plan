import { useNavigate } from "react-router-dom";
import { handleClick } from "./ViewAllButtonHandler"

export default function ViewAll() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => handleClick(navigate)}
                    className="w-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800 cursor-pointer transition duration-300 hover:scale-110">View All</button>
        </div>
    );
}