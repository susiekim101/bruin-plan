import type { TotalUnitsProps } from "../../types"

export default function TotalUnits({units }: TotalUnitsProps) {
    const MIN_UNITS = Number(localStorage.getItem('MIN_UNITS'))

    return (
        <>
        <div className="w-fit h-fit text-white p-1 border rounded-md border-blue-800 bg-blue-800">
            <p className="text-sm">Units: {units} / {MIN_UNITS}</p>
        </div>
        </>
    )
}