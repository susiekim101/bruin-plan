import { useEffect } from "react";
import axios from "axios";
interface TotalUnitsProps {
    units: number;
    userId: number | null
}

export default function TotalUnits({units, userId}: TotalUnitsProps) {
    const MIN_UNITS = Number(localStorage.getItem('MIN_UNITS'))
    useEffect(() => {
        const checkUnits = async() => {
            try {
                await axios.post(`http://localhost:3001/plan/unsharePlan/${userId}`);
            } catch {
                console.error("Failed to unshare user plan");
            }
        } 
        if(units < MIN_UNITS) {
            checkUnits();
        }
    }, [units, userId]);

    return (
        <>
        <div className="w-fit h-fit text-white p-1 border rounded-md border-blue-800 bg-blue-800">
            <p className="text-sm">Units: {units} / {MIN_UNITS}</p>
        </div>
        </>
    )
}