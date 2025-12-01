import { useState, useRef, useEffect, useId } from 'react';

type CourseStatusProps = {
    initialStatus?: 'Planned' | 'In Progress' | 'Taken';
};


function CourseStatus({ initialStatus = 'Planned' }: CourseStatusProps) {
    const [status, setStatus] = useState<'Planned' | 'In Progress' | 'Taken'>(initialStatus);
    const selectRef = useRef<HTMLSelectElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const [color, setColor] = useState<string>('bg-[#D35D5D]');
    const reactId = useId();

    useEffect(() => {
        if (spanRef.current && selectRef.current) {
            spanRef.current.textContent = status;
            const newWidth = spanRef.current.offsetWidth;
            selectRef.current.style.width = `${newWidth}px`;
        }
    }, [status]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value as 'Planned' | 'In Progress' | 'Taken';
        setStatus(newStatus);
        setColor(
            newStatus === 'Taken'
                ? 'bg-[#5CD65C]'
                : newStatus === 'In Progress'
                ? 'bg-[#D3BD5D]'
                : 'bg-[#D35D5D]'
        );
    };

    return (
        <div className="
            flex items-center gap-1
        ">
            <span className={`
                h-2 w-2 rounded-full ml-1 ${color}
            `}></span>
            <select 
                id={`${reactId}-status`}
                ref={selectRef}
                onChange={handleChange}
                defaultValue={initialStatus}
                className="w-fit">
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Taken">Taken</option>
            </select>
            <span
                ref={spanRef}
                className="absolute left-[-9999px] top-0 whitespace-pre px-3"
            />
        </div>
    );
};

export default CourseStatus;