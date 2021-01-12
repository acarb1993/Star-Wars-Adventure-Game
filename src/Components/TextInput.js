import React from "react"
import Form from "react-bootstrap/Form"

function TextInput(props) {
    return (
        <Form.Group>
            <Form.Label>
                {props.text}
            </Form.Label>
            <Form.Control 
                type="text"
                value={props.value}
                onChange={props.onChange}
            >
            </Form.Control>
        </Form.Group>
    )
}

export default TextInput