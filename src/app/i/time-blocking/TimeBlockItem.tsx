import {Controller, useForm} from "react-hook-form";
import {TransparentField} from "@/components/transparentField/TransparentField";
import {TimeBlockSelect} from "@/app/i/time-blocking/TimeBlockSelect";
import {UseUpdateTimeBlock} from "@/app/i/time-blocking/timeblockhooks/useUpdateTimeBlock";
import debounce from "lodash.debounce";
import {UseCreateTimeBlock} from "@/app/i/time-blocking/timeblockhooks/useCreateTimeBlock";
import {useCallback, useEffect} from "react";
import classes from "./timeblockhooks/TimeBlock.module.css"
import {UseDeleteTimeBlock} from "@/app/i/time-blocking/timeblockhooks/useDeleteTimeBlock";
import {Draggable} from "@/app/i/time-blocking/timeblockhooks/dnd/Draggable";
import {useTimeBlockSortable} from "@/app/i/time-blocking/timeblockhooks/dnd/useTimeBlockSortable";
import {GripVertical} from "lucide-react";

interface TimeBlockItemTypeProp {
    name: string,
    color?: string,
    duration: number,
    order: number,
    id: string,
    refetch: () => void,
}

export function useTimeBlockDebounce({watch, id, refetch}) {
    const {updateTimeBlock} = UseUpdateTimeBlock(refetch)
    const {createTimeBlock} = UseCreateTimeBlock(refetch)
    const debouncedCreateTimBlock = useCallback(
        debounce((formData) => {

            createTimeBlock(formData)
        }, 1200), [])
    const debouncedUpdateTimBlock = useCallback(
        debounce((formData) => {
            updateTimeBlock({id: id, data: formData})
        }, 1200), [])
    useEffect(() => {
        const {unsubscribe} = watch((formData) => {
            if (id) {
                debouncedUpdateTimBlock({
                    ...formData,
                    color: formData.color || undefined
                })
            } else {
                debouncedCreateTimBlock(formData)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [watch, debouncedUpdateTimBlock, debouncedCreateTimBlock]);
}

const TimeBlockItem = (
    {
        name, duration, color, id, refetch

    }: TimeBlockItemTypeProp
) => {
    const {register, control, watch} = useForm({
        defaultValues: {
            name: name,
            color: color,
            duration: duration,
        }
    })
    const {deleteTimeBlock} = UseDeleteTimeBlock(refetch)
    useTimeBlockDebounce({watch, id, refetch})
    const {attributes,transform,transition,setNodeRef,listeners,style}=useTimeBlockSortable(id)
    return (
            <div ref={setNodeRef} style={transform ?{transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,color:`${color}`,position:"revert"}: {color:`${color}`}} className={"timeBlockItem"}>
                <button
                    {...attributes}
                    {...listeners}
                    aria-describedby={'time-block'}
                ><GripVertical/></button>
                <div><TransparentField
                    type={"text"}
                    {...register('name')}/></div>
                <div    >
                    <Controller
                        control={control}
                        name={'color'}
                        render={({field: {value, onChange}}) => (
                            <TimeBlockSelect
                                data={['red', 'orange', 'gray', "green", "purple", "black", "transparent"].map(item => ({
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
                    <Controller
                        control={control}
                        name={'duration'}
                        render={({field: {value, onChange}}) => (
                            <input type={"number"}

                                   style={{color: `${color}`,width:"3rem",background:'transparent',border:"none",outline:'0',overflow:"visible"}}

                                   onChange={(e) => {
                                       if (Number(e.target.value)<999)
                                       onChange(Number(e.target.value))
                                   }}
                                   value={value || 0}
                            />)}/></div>
                <div>min</div>
                <button onClick={() => deleteTimeBlock(id,)}>delete</button>
            </div>
    );
};

export default TimeBlockItem;