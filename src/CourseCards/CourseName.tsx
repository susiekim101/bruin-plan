import { useState, useId, useEffect, useRef } from "react";

function CourseName() {
    const [name, setName] = useState<string>("");
    const reactId = useId();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [name]);

    return (
        <>
            <textarea
                id={`${reactId}-inputtedName`}
                className="w-full"
                ref={textAreaRef}
                value={name}
                onChange={handleChange}
                placeholder="Enter course name"
                rows={1}
            >
            </textarea>
        </>
    );
}

export default CourseName;