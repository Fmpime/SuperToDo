import {useCallback, useEffect} from "react";
import {TypeTaskFormState} from "@/type/task.types";
import debounce from "lodash.debounce";
import useCreateTask from "@/app/i/tasks/taskshook/UseCreateTask";
import useUpdateTask from "@/app/i/tasks/taskshook/UseUpdateTask";
import {UseFormWatch} from "react-hook-form";



interface InterfaceUseTaskDebounce {
    watch:UseFormWatch<TypeTaskFormState>
    itemId:string
}
export function useTaskDebounce({watch,itemId}:InterfaceUseTaskDebounce){

    const {createTask}= useCreateTask()
    const {updateTask}= useUpdateTask()
const debouncedCreateTask = useCallback(
    debounce((formData:TypeTaskFormState)=>{
    createTask(formData)
    },1200),[])
    const debouncedUpdateTask = useCallback(
    debounce((formData:TypeTaskFormState)=>{
    updateTask({id:itemId,data:formData})
    },1200),[])
    useEffect(() => {
        const {unsubscribe} = watch(formData=>{
            if (itemId){
                debouncedUpdateTask({
                    ...formData,
                    priority:formData.priority || undefined
                })

            }else {
                debouncedCreateTask(formData)
            }
        })
        return()=>{
            unsubscribe()
        }
    }, [watch,debouncedUpdateTask,debouncedCreateTask]);
}
