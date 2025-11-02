export default function ShareButton() {
    function handleClick() {
        /* TODO */
        console.log("Share Button clicked");
    }

    return (
        <div>
            <button onClick={handleClick}
                    className="w-fit text-white px-3 py-2 borer rounded-xl border-blue-900 bg-blue-900 p-3">Share</button>
        </div>
    )
}