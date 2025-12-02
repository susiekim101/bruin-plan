import TotalUnits from "../components/TotalUnits/TotalUnits";
import Share from "../components/Share/Share";

interface HeaderProps {
    totalUnits: number,
    year: number,
    units: number
}
export default function Header({totalUnits, year, units}: HeaderProps) {

    return (
        <div className="w-full flex justify-between items-center px-3">
            <TotalUnits units={totalUnits}/>
            <p className="text-4xl text-sky-800 font-bold">Year {year}</p>
            <Share units={units}/>
        </div>
    );
}