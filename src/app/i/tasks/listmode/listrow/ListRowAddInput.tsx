import {Dispatch, SetStateAction} from "react";
import {ITaskResponse} from "@/type/task.types";

export function ListAddRowInput(props: {
    filterDate?: string
    setItems: Dispatch<SetStateAction<any | undefined>>
    placeholder:string
}) {
    const addRow=()=>{
        props.setItems(last=>{
            if (!last)return
            return[
                ...last,
                {
                    id:'',
                    name:'',
                    isCompleted:false,
                    createdAt:props.filterDate
                }
            ];
        })
    }
    return (
        <div>
            <button
                onClick={addRow}
            >
                {props.placeholder}
            </button>
        </div>
    );
}