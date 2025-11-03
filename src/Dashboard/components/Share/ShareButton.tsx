export default function ShareButton() {
    function handleClick() {
        /* TODO */
        console.log("Share Button clicked");
    }

    return (
        <div>
            <button onClick={handleClick}
                    className="w-fit text-white py-1 px-2 text-sm border rounded-md border-blue-800 bg-blue-800">Share</button>
        </div>
    )
}