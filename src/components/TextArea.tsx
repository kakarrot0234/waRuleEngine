import "../css/TextAreaWithTitle.css";

import React = require("react");

export interface ITextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    description?: string;
}

export default function CustomTextArea(props: ITextAreaProps) {
    return (
        <div className="text-area-with-title">
            <label className="text-area-title">{props.description}</label>
            <textarea className="text-area" {...props}></textarea>
        </div>
    );
}
