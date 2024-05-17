import {forwardRef, InputHTMLAttributes} from "react";


export const TransparentField = forwardRef<any,any>((
    {...rest},ref)=>{
        if ("textarea"===rest.type) {
            return (
                <textarea maxLength={100} rows={8} cols={18} style={{
                    background: 'transparent',
                    resize: "none",
                    border: "none",
                    outline: '0',
                    width: "100%",
                    overflow: "visible"
                }} ref={ref}{...rest}/>
            )
        }
    if ("text"===rest.type) {
        return (
            <input maxLength={100} style={{
                background: 'transparent',
                resize: "none",
                border: "none",
                outline: '0',
                width: "100%",
                overflow: "visible"
            }} ref={ref}{...rest}/>
        )
    }
    }
)