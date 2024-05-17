import {useQuery} from "@tanstack/react-query";
import {userService} from "@/services/user.service";
import {taskService} from "@/services/task.service";
import {useEffect, useState} from "react";
import {ITaskResponse} from "@/type/task.types";

export function useTasks(){
    const {data,isLoading} = useQuery({
        queryKey:['tasks'],
        queryFn:()=>taskService.getTasks()
    })
    const [items,setItems] = useState<ITaskResponse[] | undefined>(data?.data)
    useEffect(() => {
        setItems(data?.data)
    }, [data?.data,setItems]);
    return {items,setItems,isLoading}
}