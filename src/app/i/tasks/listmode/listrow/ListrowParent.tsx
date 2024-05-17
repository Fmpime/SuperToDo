import {ITaskResponse} from "@/type/task.types";
import {Dispatch, SetStateAction} from "react";
import {Draggable, Droppable} from "@hello-pangea/dnd";
import {ListRow} from "@/app/i/tasks/listmode/listrow/ListRow";
import {FILTERS} from "@/app/i/tasks/columns/columns.data";
import {filterTasks} from "@/app/i/tasks/filterTasks";
import { ListAddRowInput } from "./ListRowAddInput";


interface ListrowParentType {
    value: string
    label: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}


export function ListRowParent({value, items, label, setItems}:ListrowParentType){
    return(
        <Droppable droppableId={value}>
            {provided => (
                <div className={"ListRowParent"} ref={provided.innerRef} {...provided.droppableProps}>
                    <div>
                      <div className={"lisRowLabel"}>{label}</div>
                    </div>
                    {filterTasks(items,value)?.map((item,index)=>(
                        <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        >
                            {provided=>(
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <ListRow
                                    key={item.id}
                                    item={item}
                                    setItems={setItems}
                                    />
                                </div>
                            )}
                        </Draggable>
                ))}
                    {provided.placeholder}
                    {value!=='completed'&& !items?.some(item=>!item.id)&&(
                        <ListAddRowInput
                            placeholder={"Add tasks..."}
                            setItems={setItems}
                            filterDate={FILTERS[value]?FILTERS[value].format():undefined}

                        />
                    )}
                </div>
            )}
        </Droppable>
    )
}