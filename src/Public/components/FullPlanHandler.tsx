import { useEffect } from "react";
import axios from "axios";

type PlanItems = {
    plan_item_id: number,
    course_number: string,
    course_name: string,
    year: number,
    quarter: string,
}

export function useFetchItems(plan_id: number, setPlanItems: (plans: PlanItems[]) => void) {
    useEffect(() => {
        const fetchPlanItems = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/planItems/getPlanItems/${plan_id}`);
                const fetchedItems = response.data.planItems;
                setPlanItems(fetchedItems);
            } catch (err) {
                console.error(err);
                setPlanItems([]);
            }
        };
        fetchPlanItems();
    }, [plan_id]);
}
