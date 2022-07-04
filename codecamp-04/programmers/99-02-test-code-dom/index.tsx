import { useState } from "react";

export default function TestCodeDomPage() {
    const [isChecked, setIsChecked] = useState(false);

    const onChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label>
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            {isChecked ? "on" : "off"}
        </label>
    );
}
