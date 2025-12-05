import PlanCard from "./PlanCard";
import { useState } from "react";
import {useFetchPlans} from "./PublicCardGridHandler";

interface PlanCardGridProps {
    filter: string,
}

interface Plan {
    plan_id: number,
    major: string
}

function PlanCardGrid({ filter }: PlanCardGridProps) {
    const [ allPlans, setAllPlans] = useState<Plan[]>([]);

    useFetchPlans(setAllPlans);

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:min-w-full lg:grid-cols-5 gap-6 xl:gap-10">
            { allPlans.filter((plan) => filter == "" ? true : plan.major == filter).map((plan) => (
                <PlanCard key={plan.plan_id} plan_id={plan.plan_id} major={plan.major}/>
            ))}
        </div>
    );
}

export default PlanCardGrid;