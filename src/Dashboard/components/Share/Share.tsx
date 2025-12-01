import ShareButton from "./ShareButton"
import ViewAll from "./ViewAllButton"

export default function Share() {

    return (
        <div className="w-fit flex flex-col justify-items-center items-center">
            <p className="text-gray-500 font-bold text-sm"> Public Bulletin</p>
            <div className="flex gap-2">
                <ShareButton/>
                <ViewAll/>
            </div>
        </div>
    )
}