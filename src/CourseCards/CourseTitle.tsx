import { useState, useId, useEffect, useRef } from "react";    

function CourseTitle() {
    const [title, setTitle] = useState<string>("");
    const reactId = useId();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [title]);

    return (
        <>
            <textarea
                id={`${reactId}-inputtedTitle`}
                className="w-full"
                ref={textAreaRef}
                value={title}
                onChange={handleChange}
                placeholder="Enter course title"
                rows={1}
            >
            </textarea>
        </>
    );
}

export default CourseTitle;