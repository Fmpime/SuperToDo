import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {TypePomodoroRoundState} from "@/type/pomodoro.types";
import {pomodoroService} from "@/services/pomodoro.service";
interface UseUpdateRoundProp{
    refetch:()=>void
}
export const UseUpdateRound = ({refetch}:UseUpdateRoundProp) => {
    const queryClient = useQueryClient()
    const {mutate:updateRound,isPending} = useMutation({
        mutationKey: ['update round'],
        mutationFn: ({id,data}:{id:string,data:TypePomodoroRoundState}) =>pomodoroService.updateRound(id, data),
        onSuccess(){
            toast.success('Successfully update round!')
            queryClient.invalidateQueries({queryKey:['pomodoro round']})
            if (refetch)
            refetch()
        }
    })

    return {updateRound,isPending}
};