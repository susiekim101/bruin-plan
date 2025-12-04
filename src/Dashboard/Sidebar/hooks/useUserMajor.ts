import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Major {
    major_name: string,
    major_id: number
}

export function useUserMajor() {
    const [ userMajor, setUserMajor ] = useState<Major>();
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserMajor = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/major', { withCredentials: true });
                setUserMajor(response.data.data);
            } catch (err){
                console.error("Failed to load user's major: ", err);
                navigate('/');
            }
        }
        loadUserMajor();
    }, []);

    return { userMajor };
}