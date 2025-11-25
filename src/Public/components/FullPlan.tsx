import { X } from "lucide-react";

type FullPlanProps = {
    handleCloseClick: () => void;
};

function FullPlan({ handleCloseClick }: FullPlanProps) {
    return (
        <>
            <X onClick={handleCloseClick}/>
            { /* WRITE THE CODE HERE */ }
        </>
    );
}

export default FullPlan;