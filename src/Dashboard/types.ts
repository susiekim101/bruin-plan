export interface Course {
    course_id: number | null;
    course_number: string;
    course_name: string;
    course_units: number;
    status: 'Planned' | 'In Progress' | 'Completed';
    category: string;
    major_id: number;
}

export interface Major {
    major_name: string,
    major_id: number
}

export interface MajorOption {
    value: number,
    label: string
}