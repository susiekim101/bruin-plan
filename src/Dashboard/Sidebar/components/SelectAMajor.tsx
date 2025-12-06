import Select from 'react-select';
import type { MajorOption } from '../../types.ts'

interface SelectAMajorProps {
    majorOptions: MajorOption[],
    selectedOption: MajorOption | null,
    handleChange: (opt: MajorOption | null) => void
}

function SelectAMajor ({majorOptions, selectedOption, handleChange} : SelectAMajorProps) {
    return (
        <>
            <label hidden htmlFor="major-select-input">Select a major</label>
            <Select<MajorOption>
                name='filter'
                inputId="major-select-input"
                className='pb-3 text-sm'
                placeholder='Select a major'
                value={selectedOption}
                options={majorOptions}
                onChange={handleChange}
                isSearchable={true}
                isClearable={true}
            />
        </>
    );
}

export default SelectAMajor;
