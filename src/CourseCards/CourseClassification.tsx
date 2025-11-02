import { useState, useRef, useEffect, useId} from 'react';

type CourseClassificationProps = {
    initialClassification?: 'Major Req' | 'Elective' | 'Gen Ed' | 'Tech Breadth' | 'Sci Tech';
};

function CourseClassification({ initialClassification = 'Major Req', }: CourseClassificationProps) {
    const [classification, setClassification] = useState<'Major Req' | 'Elective' | 'Gen Ed' | 'Tech Breadth' | 'Sci Tech'>(initialClassification);
    const selectRef = useRef<HTMLSelectElement>(null);
    const reactId = useId();
    
        useEffect(() => {
            if (selectRef.current) {
                selectRef.current.value = classification;
            }
        }, [classification]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newClassification = event.target.value as 'Major Req' | 'Elective' | 'Gen Ed' | 'Tech Breadth' | 'Sci Tech';
        setClassification(newClassification);
    };

    return (
        <div>
            <select id={`${reactId}-classification`} ref={selectRef} onChange={handleChange} defaultValue={initialClassification}>
                <option value="Major Req">Major Req</option>
                <option value="Elective">Elective</option>
                <option value="Gen Ed">Gen Ed</option>
                <option value="Tech Breadth">Tech Breadth</option>
                <option value="Sci Tech">Sci Tech</option>
            </select>
        </div>
    );
};

export default CourseClassification;