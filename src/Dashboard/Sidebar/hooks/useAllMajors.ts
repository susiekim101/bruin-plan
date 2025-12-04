import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { MajorOption } from '../Filter.tsx';

interface Major {
    major_name: string,
    major_id: number
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