import TotalUnits from "../components/TotalUnits/TotalUnits";
import Share from "../components/Share/Share";

interface HeaderProps {
    year: number,
    units: number
}
export default function Header({year, units}: HeaderProps) {

    return (
        <div className="w-full flex justify-between items-center px-3">
            <TotalUnits units={units}/>
            <p className="text-4xl text-sky-800 font-bold">Year {year}</p>
            <Share units={units}/>
        </div>
    );
}