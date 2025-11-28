import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type FullPlanProps = {
    plan_id: number,
    handleCloseClick: () => void;
};

type PlanItems = {
    plan_item_id: number,
    plan_id: number,
    course_id: number,
    academic_year: number,
    quarter: string,
    status: string
}

function FullPlan({ plan_id, handleCloseClick }: FullPlanProps) {
    const [ planItems, setPlanItems ] = useState<PlanItems[]>([]);

   const dummyData = [
        {
            plan_item_id: 2001,
            plan_id: 10,
            course_id: 1001, // MATH 31A
            academic_year: 1,
            quarter: 'Fall',
            status: 'Completed'
        },
        {
            plan_item_id: 2002,
            plan_id: 10,
            course_id: 1002, // COM SCI 31
            academic_year: 1,
            quarter: 'Fall',
            status: 'Completed'
        },
        {
            plan_item_id: 2003,
            plan_id: 10,
            course_id: 1003, // MATH 31B
            academic_year: 1,
            quarter: 'Winter',
            status: 'Completed'
        },
        {
            plan_item_id: 2004,
            plan_id: 10,
            course_id: 1004, // COM SCI 32
            academic_year: 1,
            quarter: 'Winter',
            status: 'In Progress'
        },
        {
            plan_item_id: 2005,
            plan_id: 10,
            course_id: 1005, // MATH 32A
            academic_year: 1,
            quarter: 'Spring',
            status: 'Planned'
        },
        {
            plan_item_id: 2006,
            plan_id: 10,
            course_id: 1006, // COM SCI 33
            academic_year: 2,
            quarter: 'Fall',
            status: 'Planned'
        },
        {
            plan_item_id: 2007,
            plan_id: 10,
            course_id: 1007, // COM SCI M51A
            academic_year: 2,
            quarter: 'Fall',
            status: 'Planned'
        },
    ];

    useEffect(() => {
        const fetchPlanItems = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/planItems/getPlanItems/${plan_id}`);
                const fetchedItems = response.data.planItems;
                setPlanItems(fetchedItems);
            } catch (err) {
                console.error(err);
                setPlanItems(dummyData);
            }
        };
        fetchPlanItems();
    });

    return (
        <>
            <X onClick={handleCloseClick}/>
            { /* WRITE THE CODE HERE */ }
            { /* USE DATA FROM planItems TO DISPLAY ON SCREEN */ }
        </>
    );
}

export default FullPlan;