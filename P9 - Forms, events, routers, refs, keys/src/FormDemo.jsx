import React, { useRef, useState } from "react";

const FormDemo = () => {
    const inputRef = useRef();
    const [items, setItems] = useState(["Item1", "Item2", "Item3", "Item4"]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setItems([...items, inputRef.current.value]);
        inputRef.current.value = "";
    };

    return (
        <div className="main">
            <form onSubmit={handleSubmit}>
                <input ref={inputRef} placeholder="Enter the Item" />
                <button>Add</button>
            </form>
            <ul>
                {
                    items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default FormDemo