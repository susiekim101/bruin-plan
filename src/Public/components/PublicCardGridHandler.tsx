import { useEffect } from "react";
import axios from "axios";

interface Plan {
    plan_id: number,
    major: string
}

interface RawPlan {
    plan_id: number,
    major_id: number,
}

export function useFetchPlans(setAllPlans: (plans: Plan[]) => void) {
    /* 
    /getAllPublicPlans will return an array of Plan objects that holds { plan_id, major_id }. 
    Map through the response and fetch the major_name from /getMajorById
    Move the fetching of public plans to the Grid component to reduce the number of modules that depends on this functionality. */
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
                        console.error(`Error in translating major_id: ${plan.major_id} to major name, `, err);
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
    }, [setAllPlans]);
}