export default function ViewAll() {

    function handleClick() {
        console.log("View All button clicked")
        /* TODO */
    } 

    return (
        <div>
            <button onClick={handleClick}
                    className="w-fit text-white px-3 py-2 borer rounded-xl border-blue-900 bg-blue-900 p-3">View All</button>
        </div>
    );
}