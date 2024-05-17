import {timeBlockService} from "@/services/time-block.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ITimeBlockResponse} from "@/type/time-block.types";
import {toast} from "sonner";

export function UseDeleteTimeBlock(refetch:()=>void) {
    const queryClient = useQueryClient()
    const {mutate: deleteTimeBlock, isPending: pendingDeleteTimeBlock} = useMutation({
        mutationKey: ['delete time block'],
        mutationFn: (id: string) => timeBlockService.deleteTimeBlock(id),
        onSuccess: () => {
            toast.success('Successfully delete block!')
            queryClient.invalidateQueries({queryKey: ['timeblocking']})
            refetch()
        }
    })
    return {deleteTimeBlock, pendingDeleteTimeBlock}
}