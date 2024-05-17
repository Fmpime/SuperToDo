import {useMutation, useQueryClient} from "@tanstack/react-query";
import {pomodoroService} from "@/services/pomodoro.service";


export function useDeleteSession(onSuccssecDelete,refetch){
    const queryClient = useQueryClient()
    const {mutate:deleteSession, isPending:deletePending} = useMutation({
        mutationKey:['delete new session'],
        mutationFn:(id:string)=> pomodoroService.deleteSession(id),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:['delete today session'],

            })
            refetch()
            onSuccssecDelete()
        }
    })

    return{deleteSession,deletePending}
}