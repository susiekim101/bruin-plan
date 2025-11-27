import { useState, useRef, useEffect, useId} from 'react';

type CourseClassificationProps = {
    initialClassification?: 'Major' | 'Elective' | 'Gen Ed' | 'Tech Breadth' | 'Sci Tech';
};

function CourseClassification({ initialClassification = 'Major', }: CourseClassificationProps) {
    const [classification, setClassification] = useState<'Major' | 'Elective' | 'Gen Ed' | 'Tech Breadth' | 'Sci Tech'>(initialClassification);
    const selectRef = useRef<HTMLSelectElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const reactId = useId();
    
    useEffect(() => {
        if (spanRef.current && selectRef.current) {
            spanRef.current.textContent = classification;
            const newWidth = spanRef.current.offsetWidth;
            selectRef.current.style.width = `${newWidth}px`;
        }
    }, [classification]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newClassification = event.target.value as 'Major' | 'Elective' | 'Gen Ed' | 'Tech Breadth' | 'Sci Tech';
        setClassification(newClassification);
    };

    return (
        <div>
            <select 
                id={`${reactId}-classification`} 
                ref={selectRef} 
                onChange={handleChange} 
                defaultValue={initialClassification} 
                className={`w-fit`}>
                <option value="Major">Major</option>
                <option value="Elective">Elective</option>
                <option value="Gen Ed">Gen Ed</option>
                <option value="Tech Breadth">Tech Breadth</option>
                <option value="Sci Tech">Sci Tech</option>
            </select>
            {/* <span
                ref={spanRef}
                className="absolute left-[-9999px] top-0 whitespace-pre px-2.5"
            /> */}
        </div>
    );
};

export default CourseClassification;