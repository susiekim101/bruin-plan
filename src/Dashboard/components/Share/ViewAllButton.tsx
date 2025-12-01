export default function ViewAll() {

    function handleClick() {
        console.log("View All button clicked")
        /* TODO */
    } 

    return (
        <div>
            <button onClick={handleClick}
                    className="w-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800 transition duration-300 hover:scale-110">View All</button>
        </div>
    );
}