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
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
            <div className="relative p-6 bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

                <X 
                    onClick={handleCloseClick}
                    className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-black"
                />

                    <h2 className="text-2xl font-bold text-blue-800">4-Year Plan Overview</h2>

                {(() => {
                    const years: Record<number, Record<string, PlanItems[]>> = {};

                    for(let y = 1; y <= 4; y++) {
                        years[y] = { 'Fall': [], 'Winter': [], 'Spring': [], 'Summer': [] };
                    }

                    planItems.forEach(item => {
                        if ( !years[item.academic_year]) return;
                        years[item.academic_year][item.quarter].push(item);
                    });

                    const quarterOrder = ['Fall', 'Winter', 'Spring', 'Summer'];

                    return (
                        <div className="grid grid-cols-1 gap-6">
                            {Object.entries(years).map(([year, quarters]) => (
                                <div key={year} className="border rounded-xl p-4 shadow-sm bg-gray-50">
                                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Year {year}</h3>

                                    <div className="grid grid-cols-4 gap-4">
                                        {quarterOrder.map(quarter => (
                                            <div key={quarter} className="bg-white border rounded-lg p-3 shadow-sm">
                                                <h4 className="font-semibold text-blue-800 mb-2">{quarter}</h4>

                                                {quarters[quarter].length === 0 ? (
                                                    <p className="text-sm text-gray-400 italic">No Courses</p>
                                                ) : (
                                                    quarters[quarter].map(item => (
                                                        <div key={item.plan_item_id} className="p-2 mb-2 rounded-lg bg-blue-100">
                                                            <p className="font-medium text-sm">Course ID: {item.course_id}</p>
                                                            <p className="text-xs text-gray-600">Status: {item.status}</p>
                                                         </div>
                                                     ))
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })()}  
            </div>
            </div>
        </>
    );
}
export default FullPlan;