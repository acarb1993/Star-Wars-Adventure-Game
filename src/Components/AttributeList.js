// This component takes in an array and displays its contents as options in a <select> tag
// Disabled text will show with an empty value if you can not make a default option, this helps prevent errors

import React from "react"

function AttributeList(props) {
    return (
        <div>
            <label>
                {props.name}
            </label>
            <br />
            <select
                value={props.value}
                onChange={props.onChange}
            >
                {props.text && <option value="" disabled="disabled">{props.text}</option>}
                {props.list && props.list.map((item, index) =>
                        
                        <option
                            key={index}
                            value={typeof props.value === "string" ? item : index}
                        >
                            {item}
                        </option>     
                    )}
            </select>
        </div>
    )
}

export default AttributeList