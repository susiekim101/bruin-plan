import axios from "axios";

type handleMarkAllProps = {
    selectionOption: string | undefined;
    userId: number | null;
    yearIndex: number;
    quarterName: 'Fall' | 'Winter' | 'Spring' | 'Summer';
    loadCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => void;
}

async function handleMarkAllChange({selectionOption, userId, yearIndex, quarterName, loadCourses}: handleMarkAllProps) {
    if (selectionOption === undefined || userId === null) {
        return;
    }
    const newStatus = selectionOption as 'Planned' | 'In Progress' | 'Completed';
    const statusData = {
        userId: userId,
        yearIndex: yearIndex,
        quarterName: quarterName,
        status: newStatus,
    };
    try {
        await axios.post(`http://localhost:3001/quarter/setStatus`, statusData);
    } catch (err) {
        console.error(`Could not update quarter status in database: `, err);
    }
    loadCourses(yearIndex, quarterName);
}

export default handleMarkAllChange;