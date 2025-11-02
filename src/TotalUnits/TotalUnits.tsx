interface TotalUnitsProps {
    units: number;
}

export default function TotalUnits({units}: TotalUnitsProps) {

    return (
        <>
        <div className="w-fit text-white px-3 borer rounded-xl border-blue-900 bg-blue-900 p-3">
            <p className="text-lg">Units: {units} / 180</p>
        </div>
        </>
    )
}