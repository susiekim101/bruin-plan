import { useState, useEffect } from 'react';
import Select from 'react-select';
import type { OnChangeValue, ActionMeta } from 'react-select';
import axios from 'axios';

interface Major {
    major_id: number;
    major_name: string;
}

export interface MajorOption {
    value: number;
    label: string;
}

interface FilterProps {
    selectedMajor: MajorOption | null;
    setSelectedMajor: (major: MajorOption | null) => void;
}

function Filter ({selectedMajor, setSelectedMajor}: FilterProps) {
    const [ options, setOptions ] = useState<MajorOption[]>([]);

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

    const handleChange = (
        selectedOption: OnChangeValue<MajorOption, false>
    ) => {
        setSelectedMajor(selectedOption);
    }

    return (
        <Select 
            id="majorSelect"
            name="major"
            options={options}
            onChange={handleChange}
            value={selectedMajor}
            placeholder="Filter courses for a different major"/>
    );
}

export default Filter;