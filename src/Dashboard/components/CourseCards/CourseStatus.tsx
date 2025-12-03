import { useState, useRef, useEffect } from 'react';

type CourseStatusProps = {
    status: 'Planned' | 'In Progress' | 'Completed';
};


function CourseStatus({status }: CourseStatusProps) {
    const selectRef = useRef<HTMLSelectElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const [color, setColor] = useState<string>('bg-[#D35D5D]');

    useEffect(() => {
        if (spanRef.current && selectRef.current) {
            spanRef.current.textContent = status;
            const newWidth = spanRef.current.offsetWidth;
            selectRef.current.style.width = `${newWidth}px`;
        }
        setStatusColor();
    }, [status]);

    const setStatusColor = () => {
        setColor(
            status === 'Completed'
                ? 'bg-[#5CD65C]'
                : status === 'In Progress'
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
            <p className="pr-1 whitespace-nowrap">
                {status}
            </p>
            <span
                ref={spanRef}
                className="absolute left-[-9999px] top-0 whitespace-pre px-3"
            />
        </div>
    );
};

export default CourseStatus;