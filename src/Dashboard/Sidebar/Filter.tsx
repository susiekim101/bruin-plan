import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

interface Major {
    major_id: number;
    major_name: string;
}

function Filter () {
    const [ options, setOptions ] = useState([]);

    useEffect(() => {
        const loadMajors = async () => {
            try {
                const response = await axios.get('http://localhost:3001/majors');
                setOptions(response.data.data.map((major: Major) => ({
                    value: major.major_id, 
                    label: major.major_name
                })));
                console.log(response.data.data);
            } catch {
                console.error("Failed to load majors.");
            }
        };

        loadMajors();
    }, []);

    return (
        <Select options={options}/>
    );
}

export default Filter