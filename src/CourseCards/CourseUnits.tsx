import { useState, type ChangeEvent, useId } from 'react'

function CourseUnits() {
    const [numUnits, setNumUnits] = useState<number>(0)
    const reactId = useId();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const unitVal = Number(value)
        if (!isNaN(Number(unitVal))) {
            setNumUnits(unitVal)
        }
    }
    return (
        <>
            <input
                type="number"
                min="1"
                max="5"
                id={`${reactId}-inputtedUnits`}
                value={numUnits}
                onChange={handleChange}
            >
            </input>
        </>
    );
}

export default CourseUnits