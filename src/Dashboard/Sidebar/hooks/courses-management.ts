import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Course, Major, MajorOption } from '../../types.ts'


interface useUserCoursesProps {
    userId: number | null
}

export function useUserCourses ({ userId }: useUserCoursesProps) {
    const [ userCourses, setUserCourses ] = useState<Course[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserCourses = async () => {
            if (! userId)
                return;
            
            try {
                const response = await axios.get(`http://localhost:3001/courses/planned/${userId}`, { withCredentials: true});
                setUserCourses(response.data.data);
                console.log("User's planned courses: ", response.data.data);
            } catch (err) {
                console.error("Failed to load user's courses: ", err);
                navigate('/');
            }
        }
        loadUserCourses();
    }, [userId]);

    return { userCourses };
}

interface useMajorCoursesProps {
    userMajor: Major | undefined,
    selectedMajor: MajorOption | null
}

export function useMajorCourses ({ userMajor, selectedMajor }: useMajorCoursesProps) {
    const [ majorCourses, setMajorCourses ] = useState<Course[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const loadMajorCourses = async (majorID: number) => {
            try {
                const response = await axios.get(`http://localhost:3001/courses/${majorID}`, { withCredentials: true });
                setMajorCourses(response.data.data);
                console.log(`Displaying courses for major ${majorID}`, response.data.data);
            } catch (err){
                console.error(`Failed to load courses for selected major ${majorID}`, err);
                navigate('/');
            }
        };

        if ( selectedMajor ) {
            loadMajorCourses(selectedMajor.value);
        } else if (userMajor) {
            loadMajorCourses( userMajor.major_id )
        } else {
            return;
        }
        
    }, [userMajor?.major_id, selectedMajor?.value]);

    return { majorCourses };
}