import type { Course, Major } from '../../types.ts';
import removeCourseLogic from '../../Year/removeCourseLogic.ts'; 

interface handleDropProps {
    event: React.DragEvent<HTMLDivElement>,
    userId: number | null,
    userMajor: Major | undefined,
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
    setFilteredCourses: React.Dispatch<React.SetStateAction<Course[]>>,
    loadQuarterCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => void
}

export function handleDragOver (event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
}

export async function handleDrop ({ event, userId, userMajor, setCourses, setFilteredCourses, loadQuarterCourses }: handleDropProps) {
    event.preventDefault();
    const payload = JSON.parse(event.dataTransfer.getData("application/json"));
    const courseObj : Course = JSON.parse(payload.courseJson);
    await removeCourseLogic({courseJson: payload.courseJson, userId: userId, yearIndex: payload.sourceYearIndex, quarterName: payload.sourceQuarterName});
    loadQuarterCourses(payload.sourceYearIndex, payload.sourceQuarterName);
    if (!userMajor || !courseObj) {
        return;
    }
    setCourses(prev => [
        {
            ...courseObj,
            major_id: userMajor.major_id
        },
        ...prev
    ]);
    setFilteredCourses(prev => [
        {
            ...courseObj,
            major_id: userMajor.major_id
        },
        ...prev
    ]);
}