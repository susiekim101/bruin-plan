import axios from 'axios';

export default function ShareButton() {
    async function handleClick() {
        try{
            await axios.post('http://localhost:3001/plan/shareplan', {user_id: 1}, { withCredentials: true});
            console.log("User plan shared");
        } catch {
            console.error("Failed to share user plan");
        }
    }

    return (
        <div>
            <button onClick={handleClick}
                    className="w-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800 cursor-pointer transition duration-300 hover:scale-110">Share</button>
        </div>
    )
}