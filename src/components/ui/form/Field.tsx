"use client"

import classes from "@/components/ui/form/Form.module.css";
import {forwardRef} from "react";
interface FieldProps {
    type:string | undefined
    label:string
    id:string
    name:string
    placeholder?:string
}
const Field = forwardRef<HTMLInputElement,FieldProps>(({placeholder,type,id,name,label,...rest},ref) => {
    return (
    <div className={"AuthField"}>
            <label htmlFor={name}>{label}</label>
            <input
                placeholder={placeholder}
                id={id}
                ref={ref}
                className={classes.input}
                type={type}
                name={name}
                style={{background:"transparent",border:"0.2rem solid orange",outline:"unset"}}
                {...rest}
            />
        </div>
    );
}
)
export default Field;