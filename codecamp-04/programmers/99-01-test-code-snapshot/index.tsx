import { useState } from "react";

type IStatus = "HOVERED" | "NORMAL";

export default function TestCodePage() {
    const [status, setStatus] = useState<IStatus>("HOVERED");

    const onMouseEnter = () => {
        setStatus("HOVERED");
    };

    const onMouseLeave = () => {
        setStatus("NORMAL");
    };

    return (
        <a
            className={status}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            클릭하세요!
        </a>
    );
}
