import TotalUnits from "../components/TotalUnits/TotalUnits";
import Share from "../components/Share/Share";

interface HeaderProps {
    year: number,
}
export default function Header({year}: HeaderProps) {

    return (
        <div className="w-full flex justify-between items-center px-3">
            <TotalUnits units={10}/>
            <p className="text-4xl text-sky-800 font-bold">Year {year}</p>
            <Share/>
        </div>
    );
}