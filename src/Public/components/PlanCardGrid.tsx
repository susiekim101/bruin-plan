import PlanCard from "./PlanCard";

interface PlanCardData {
    userId: number;
    major: string;
}

interface PlanCardGridProps {
    planCards: PlanCardData[];
    filter: string,
}
function PlanCardGrid({ planCards, filter }: PlanCardGridProps) {


    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:min-w-full lg:grid-cols-5 gap-6 xl:gap-10">
            { planCards.filter((plan) => filter == "" ? true : plan.major == filter).map((plan) => (
                <PlanCard key={plan.userId} major={plan.major}/>
            ))}
        </div>
    );
}

export default PlanCardGrid