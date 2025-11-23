
type handleDropProps = {
    yearId: number;
    courseId: number;
    quarter: 'Fall' | 'Winter' | 'Spring' | 'Summer';
}

export function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    // TO-DO: implement drop into quarter
    event.preventDefault();
    
}

export function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    // TO-DO: implement dragging over quarter
    event.preventDefault();
    

}