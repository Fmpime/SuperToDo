import {useQuery} from "@tanstack/react-query";
import {timeBlockService} from "@/services/time-block.service";
import {useEffect, useState} from "react";
import {ITimeBlockResponse} from "@/type/time-block.types";


export function UseTimeBlocking(){
   const{data,isLoading,isSuccess,refetch}= useQuery({
       queryKey:['time blocking'],
       queryFn:()=>timeBlockService.getTimeBlock()
   })
    const [items,setItems] = useState<ITimeBlockResponse[] | undefined>(data?.data)
    useEffect(() => {
        setItems(data?.data)
    }, [data?.data,setItems]);
    return {items,setItems,isLoading,isSuccess,refetch}
}