import Select from 'react-select';
import type { MajorOption } from './Sidebar';

interface FilterProps {
    options: MajorOption[];
    selectedMajor: MajorOption | null;
    handleFilter: (major: MajorOption | null) => void;
}

function Filter ({options, selectedMajor, handleFilter}: FilterProps) {

    return (
        <Select 
            id="major-select"
            name="major"
            options={options}
            onChange={handleFilter}
            value={selectedMajor}
            placeholder="Select another major"/>
    );
}

export default Filter;