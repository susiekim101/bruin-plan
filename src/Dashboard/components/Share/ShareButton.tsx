export default function ShareButton() {
    function handleClick() {
        /* TODO */
        console.log("Share Button clicked");
    }

    return (
        <div>
            <button onClick={handleClick}
                    className="w-fit text-white py-1 px-2 text-sm border rounded-md border-blue-900 bg-blue-900">Share</button>
        </div>
    )
}