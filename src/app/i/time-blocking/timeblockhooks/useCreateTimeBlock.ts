import {timeBlockService} from "@/services/time-block.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ITimeBlockResponse} from "@/type/time-block.types";
import {toast} from "sonner";

export function UseCreateTimeBlock(refetch:()=>void){
    const queryClient = useQueryClient()
    const{mutate:createTimeBlock,isPending:pendingCreateTimeBlock}= useMutation({
        mutationKey:['create time block'],
        mutationFn:(data:Partial<Omit<ITimeBlockResponse, "createdAt" | "updatedAt">>)=>timeBlockService.createTimeBlock(data),
        onSuccess:()=>{
            toast.success('Successfully create block!')
            queryClient.invalidateQueries({queryKey:['timeblocking']})
            refetch()
        }
    })
    return {createTimeBlock,pendingCreateTimeBlock}
}