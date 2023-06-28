import React from "react";
import "./Activity.css"

function Activity({ name, start, end }){
    return(
        <div className="Activity">
            <p>{name}</p>
            <p>{start}</p>
            <p>{end}</p>
        </div>
    )
}

export default Activity