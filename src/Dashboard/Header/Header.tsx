import TotalUnits from "../components/TotalUnits/TotalUnits";
import Share from "../components/Share/Share";
import Year from "./Year";


export default function Header() {

    return (
        <div className="w-full flex justify-between items-center px-3 my-3">
            <TotalUnits units={10}/>
            <Year />
            <Share/>
        </div>
    );
}