import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Major, MajorOption } from '../../types.ts';

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

interface useAllMajorsProps {
    userMajor: Major | undefined
}

export function useAllMajors({ userMajor }: useAllMajorsProps) {
    const [ majors, setMajors ] = useState<MajorOption[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadAllMajors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/majors', { withCredentials: true });
                const allMajors = response.data.data.map((major: Major) => ({
                    value: major.major_id,
                    label: major.major_name
                }));
                
                if (userMajor) {
                        const allMajorsExceptUserMajor = allMajors.filter((major: MajorOption) =>
                            Number(major.value) != Number(userMajor.major_id)
                    );

                    setMajors(allMajorsExceptUserMajor);
                }
            } catch (err) {
                console.error("Failed to load all majors: ", err);
                navigate('/');
            }
        }
        loadAllMajors();
    }, [userMajor?.major_id]);

    return { majors };
}