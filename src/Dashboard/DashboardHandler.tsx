import { useEffect } from "react";

import type { NavigateFunction } from "react-router-dom";
import type { RefObject } from "react";
import axios from "axios";

export function useVerifyUser(navigate: NavigateFunction, MIN_UNITS: number) {
    useEffect(() => {
        localStorage.setItem('MIN_UNITS', `${MIN_UNITS}`);

        // Valdiate user's tokens before logging in
        const userVerification = async () => {
            if(localStorage.getItem('loggedIn') == 'false') {
                navigate('/');
                return;
            }
            try {
                await axios.get('http://localhost:3001/user/verifyUser', { withCredentials: true });
            } catch (err) {
                console.log("User unverified. ", err);
                localStorage.setItem('loggedIn', 'false');
                navigate('/');
            }
        }
        userVerification();
    }, [navigate, MIN_UNITS]);
}

export function useFetchUserId(navigate: NavigateFunction, setUserId: (userId: number) => void) {
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const res = await axios.get("http://localhost:3001/user/userId", {
                    withCredentials: true
                });
                setUserId(res.data.user_id);
            } catch (err) {
                console.error("Failed to get user ID:", err);
                navigate('/');
            }
        }; 
        fetchUserId(); 
    }, [navigate, setUserId]);
}

interface useLoadCoursesProps {
    userId: number | null,
    loadQuarterCourses: (year: number, quarter: "Fall" | "Winter" | "Spring" | "Summer") => Promise<void>
}
export function useLoadCourses({userId, loadQuarterCourses}: useLoadCoursesProps) {
    useEffect(() => {
        if (userId === null) return; 
        for (let year = 1; year <= 4; year++) {
            for (const quarter of ["Fall", "Winter", "Spring", "Summer"] as const) {
                loadQuarterCourses(year, quarter);
            }
        }
    }, [loadQuarterCourses, userId]);
}
interface Course {
    course_id: number | null;
    course_number: string;
    course_name: string;
    course_units: number;
    status: 'Planned' | 'In Progress' | 'Completed';
    category: string;
    major_id: number;
}

interface UseSetTotalUnitsProps {
    allCourses: { [key: string]: Course[] }
    setTotalUnits: (units: number) => void
}

export function useSetTotalUnits({ allCourses, setTotalUnits }: UseSetTotalUnitsProps) {
    useEffect(() => {
        let total = 0;
        for (let year = 1; year <= 4; year++) {
            for (const quarter of ["Fall", "Winter", "Spring", "Summer"] as const) {
                const courses = allCourses[`${year}-${quarter}`] || [];
                total += courses.reduce((sum, course) => sum + course.course_units, 0);
            }
        }
        setTotalUnits(total);
    }, [setTotalUnits, allCourses]);
}

type DialogRef = RefObject<HTMLDialogElement | null>;

export function handleOpenClick(dialogRef: DialogRef) {
    if(dialogRef.current)
        dialogRef.current.showModal();
}

export function handleCloseClick(dialogRef: DialogRef) {
    if(dialogRef.current)
        dialogRef.current.close();
}

export async function handleLogOut(logout: () => void, navigate: NavigateFunction) {
    try {
        logout();
        await axios.post('http://localhost:3001/user/logout', { withCredentials: true});
    } catch (err) {
        console.error("Failed to log out, ", err);
    }
    navigate('/');
}

export function handleHome(navigate: NavigateFunction) {
    navigate('/');
}

type SetYearNumType = React.Dispatch<React.SetStateAction<number>>;

export function handleLeftClick(setYearNum: SetYearNumType): void {
    setYearNum(prevYearNum => prevYearNum - 1);
}

export function handleRightClick(setYearNum: SetYearNumType): void {
    setYearNum(prevYearNum => prevYearNum + 1);
}