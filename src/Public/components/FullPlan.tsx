import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type FullPlanProps = {
    plan_id: number,
    handleCloseClick: () => void;
};

type PlanItems = {
    course_number: string,
    course_title: string,
    year: number,
    quarter: string,
}

function FullPlan({ plan_id, handleCloseClick }: FullPlanProps) {
    const [ planItems, setPlanItems ] = useState<PlanItems[]>([]);

   const dummyData: PlanItems[] = [
        {
            course_number: "MATH 31A",
            course_title: "Calculus",
            year: 1,
            quarter: 'Fall',
        },
        {
            course_number: "COM SCI 31",
            course_title: "Introduction to C++",
            year: 1,
            quarter: 'Fall',
        },
        {
            course_number: "MATH 31B",
            course_title: "Multivariable Calculus",
            year: 1,
            quarter: 'Winter',
        },
        {
            course_number: "COM SCI 32",
            course_title: "Data Structures & Algorithms",
            year: 1,
            quarter: 'Winter',
        },
        {
            course_number: "MATH 32A",
            course_title: "Differential Equations",
            year: 1,
            quarter: 'Spring',
        },
        {
            course_number: "COM SCI 33",
            course_title: "Operating Systems",
            year: 2,
            quarter: 'Fall',
        },
        {
            course_number: "COM SCI M51A",
            course_title: "Logic Systems",
            year: 2,
            quarter: 'Fall',
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