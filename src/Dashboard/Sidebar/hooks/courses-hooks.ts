import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface useUserCoursesProps {
    userId: number | null
}

export function useUserCourses ({ userId }: useUserCoursesProps) {
    const [ userCourses, setUserCourses ] = useState();
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