import {ITaskResponse, TypeTaskFormState} from "@/type/task.types";
import {Dispatch, SetStateAction} from "react";
import {useTaskDebounce} from "@/app/i/tasks/taskshook/useTaskDebounce";
import {Controller, useForm} from "react-hook-form";
import {GripHorizontal, GripVertical, Trash} from "lucide-react";
import Checkbox from "@/components/ui/checkbox/Checkbox";
import {DatePicker} from "@/components/ui/task-ui/date-picker/DatePicker";
import {Select} from "@/components/ui/task-ui/Select";
import useDeleteTask from "@/app/i/tasks/taskshook/UseDeleteTask";
import Loader from "@/components/ui/loader/Loader";
import {TransparentField} from "@/components/transparentField/TransparentField";

interface InterfaceListRow {
    item: ITaskResponse
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}


export function ListRow({item, setItems}: InterfaceListRow) {
    const {register, control, watch} = useForm<TypeTaskFormState>({
        defaultValues: {
            name: item.name,
            isCompleted: item.isCompleted,
            createdAt: item.createdAt,
            priority: item.priority

        }
    })
    const deleteFunc= ()=>{
        if (item.id){
            deleteTask(item.id)
            setItems(latest => latest?.slice(0, -1))
        }else {
            setItems(latest => latest?.slice(0, -1))
        }
    }
    useTaskDebounce({watch, itemId: item.id})
    const {deleteTask, isPending} = useDeleteTask()
    return (
        <div className={[`ListModeTaskLine`,'slide'].join(' ')}>
            <div>
                <button>
                    <GripHorizontal></GripHorizontal>
                </button>
            </div>
            <div>
                <Controller
                    control={control}
                    name="isCompleted"
                    render={({field: {value, onChange}}) => (
                        <Checkbox className={"checkbox"} onChange={onChange} value={value}/>
                    )}/>
            </div>
            <div>
                <TransparentField
                    type={"textarea"}
                    className={[watch('isCompleted') ? "CompletedTask" : ""].join(" ")} {...register('name')}/>
            </div>
            <div>
                <Controller
                    control={control}
                    name={'createdAt'}
                    render={({field: {value, onChange}}) => (
                        <DatePicker
                            onChange={onChange}
                            value={value || ''}
                        />
                    )}
                />
            </div>
            <div>
                <Controller
                    control={control}
                    name={'priority'}
                    render={({field: {value, onChange}}) => (
                        <Select
                            data={['high', 'medium', 'low'].map(item => ({
                                value: item,
                                label: item
                            }))}
                            onChange={onChange}
                            value={value || ''}
                        />
                    )}
                />
            </div>
            <div>
                <button onClick={deleteFunc}>
                    {isPending ? (<Loader/>) : <Trash size={20}/>}
                </button>
            </div>

        </div>
    )
}
