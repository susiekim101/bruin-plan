// import React, { useState } from 'react'
import Select from 'react-select'

interface MajorOptions {
    value: number,
    label: string
}

interface FilterProps {
    options: MajorOptions[]
}

function Filter () {
    return (
        <Select
            isSearchable={true}
            isClearable={true}
        />
    );
}

export default Filter
