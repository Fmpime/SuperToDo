import {timeBlockService} from "@/services/time-block.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ITimeBlockResponse} from "@/type/time-block.types";
import {toast} from "sonner";

export function UseUpdateTimeBlock(refetch:()=>void){
    const queryClient = useQueryClient()
    const{mutate:updateTimeBlock,isPending:pendingUpdateTimeBlock}= useMutation({
        mutationKey:['update time block'],
        mutationFn:({id, data}: {id:string,data:Partial<Omit<ITimeBlockResponse, "createdAt" | "updatedAt">> })=> {
            return  timeBlockService.updateTimeBlock(id, data)
        },
        onSuccess:()=> {
            toast.success('Successfully update block!')
            queryClient.invalidateQueries({queryKey: ['timeblocking']}).then()
            refetch()
        }})
    return {updateTimeBlock,pendingUpdateTimeBlock}
}