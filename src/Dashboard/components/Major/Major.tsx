interface MajorProps {
    majorName: string
}

function Major ({ majorName } : MajorProps) {
    return (
        <div className="flex gap-x-1">
            <div className="pb-3 px-1 flex flex-col justify-items-center">
                <p className="text-gray-200 font-bold text-sm"> 
                    Major:
                </p>
            </div>
            <div className="pb-3 px-1 flex flex-col justify-items-center">
                <p className="text-gray-200 font-bold text-sm"> 
                    {majorName}
                </p>
            </div>
        </div>
    )
}

export default Major;