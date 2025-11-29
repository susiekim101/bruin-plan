// import React, { useState } from 'react'
import Select from 'react-select'

export interface MajorOption {
    value: number,
    label: string
}

interface FilterProps {
    majorOptions: MajorOption[],
    selectedOption: MajorOption | null,
    handleChange: (opt: MajorOption | null) => void
}

function Filter ({majorOptions, selectedOption, handleChange} : FilterProps) {
    return (
        <Select<MajorOption>
            name='filter'
            className='pb-3 text-sm'
            placeholder='Select a different major'
            value={selectedOption}
            options={majorOptions}
            onChange={handleChange}
            isSearchable={true}
            isClearable={true}
        />
    );
}

export default Filter;
