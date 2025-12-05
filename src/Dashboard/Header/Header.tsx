import TotalUnits from "../components/TotalUnits/TotalUnits";
import Share from "../components/Share/Share";

interface HeaderProps {
    totalUnits: number,
    year: number,
}

export default function Header({totalUnits, year}: HeaderProps) {
    return (
        <div className="w-full flex justify-between items-center px-3">
            <div id="total-units">
                <TotalUnits units={totalUnits}/>
            </div>
            <p className="text-4xl text-sky-800 font-bold">Year {year}</p>
            <Share units={totalUnits}/>
        </div>
    );
}