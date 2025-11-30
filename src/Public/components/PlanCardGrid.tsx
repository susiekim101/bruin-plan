import PlanCard from "./PlanCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface PlanCardGridProps {
    filter: string,
}

interface Plan {
    plan_id: number,
    major: string
}

interface RawPlan {
    plan_id: number,
    major_id: number,
}

function PlanCardGrid({ filter }: PlanCardGridProps) {
    const [ allPlans, setAllPlans] = useState<Plan[]>([]);

    /* The useEffect sets up all public plans to render. The get request to /getAllPublicPlans will return an array of Plan objects that holds { plan_id, major_id }. 
    We want an objet with the properties { plan_id, major_name } so we map through the response and fetch the major_name from /getMajorById
    We send a GET request to retrieve this data from the backend instead of creating a dictionary in the frontend to follow Informaiton Hiding — We don't want to make
    data structures public we don't want the frontend to have to worry about updating the dictionary for every new major that's added.
    Move the fetching of public plans to the Grid component instead of the Public Page to reduce the number of modules that depends on this functionality. */
    useEffect(() => {
        const fetchAllPlans = async () => {
            try {
                const response = await axios.get('http://localhost:3001/planItems/getAllPublicPlans');
                const rawPlans = response.data.plans; // [ {plan_id, major_id}]

                const planPromises = rawPlans.map(async (plan: RawPlan) => {
                    try {
                        const majorResponse = await axios.get(`http://localhost:3001/planItems/getMajorById/${plan.major_id}`);
                        const major = majorResponse.data.major_name;
                        return {
                            plan_id: plan.plan_id,
                            major: major
                        }
                    } catch (err) {
                        console.error("Error in translating major_id to major name, ", err);
                        return { plan_id: plan.plan_id, major: 'Unknown Major' };
                    }
                });
                const plans = await Promise.all(planPromises);
                setAllPlans(plans); 
            } catch (err) {
                console.error("Could not fetch plans from frontend", err);
                setAllPlans([]);
            }
        }
        fetchAllPlans();
    }, []);

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:min-w-full lg:grid-cols-5 gap-6 xl:gap-10">
            { allPlans.filter((plan) => filter == "" ? true : plan.major == filter).map((plan) => (
                <PlanCard key={plan.plan_id} plan_id={plan.plan_id} major={plan.major}/>
            ))}
        </div>
    );
}

export default PlanCardGrid;