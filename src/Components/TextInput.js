import React from "react"

function TextInput(props) {
    return (
        <div>
            <label>
                {props.text}
            </label>
            <br />
            <input
                type={"text"}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default TextInput