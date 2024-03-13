import React from "react";

function TabPanel({ children, value, index }) {
    const id = `tabpanel-${index}`;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={id}
            aria-labelledby={`tab-${index}`}
            aria-hidden={value !== index}
        >
            {value === index && <div>{children}</div>}
        </div>
    );
}

export default TabPanel;
