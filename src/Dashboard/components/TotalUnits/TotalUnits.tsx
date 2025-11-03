interface TotalUnitsProps {
    units: number;
}

export default function TotalUnits({units}: TotalUnitsProps) {

    return (
        <>
        <div className="w-fit h-fit text-white p-1 border rounded-md border-blue-900 bg-blue-900">
            <p className="text-sm">Units: {units} / 180</p>
        </div>
        </>
    )
}