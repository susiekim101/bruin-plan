import type { ReactElement } from "react";
import { Microscope, CodeXml, MonitorCog, Computer, Unplug } from "lucide-react";
import type { DialogRef } from "../publicTypes";

export const handleOpenClick = (dialogRef: DialogRef) => {
    if(dialogRef.current) {
        dialogRef.current.showModal();
    }
}

export const handleCloseClick = (dialogRef: DialogRef) => {
    if(dialogRef.current) {
        dialogRef.current.close();
    }
}

export const majorIcon: (major: string) => ReactElement = (major: string) => {
    switch (major) {
        case "Bioengineering":
            return <Microscope className="w-15 h-15 text-yellow-200"/>
        case "Computer Science":
            return <CodeXml className="w-15 h-15 text-yellow-200"/>
        case "Computer Engineering":
            return <MonitorCog className="w-15 h-15 text-yellow-200"/>
        case "Computer Science and Engineering":
            return <Computer className="w-15 h-15 text-yellow-200"/>
        case "Electrical Engineering":
            return <Unplug className="w-15 h-15 text-yellow-200"/>
        default:
            return <></>
    }
}