import PlanCard from "./PlanCard";

interface PlanCardData {
    userId: number;
    major: string;
}

interface PlanCardGridProps {
    planCards: PlanCardData[];
}
function PlanCardGrid({ planCards }: PlanCardGridProps) {


    return (
        <div className="grid grid-cols-5 grid-rows-[5rem] gap-10 items-start">
            { planCards.map((plan) => (
                <div className="border border-black">
                    <PlanCard key={plan.userId} major={plan.major}/>
                </div>
            ))}
        </div>
    );
}

export default PlanCardGrid