import {useMutation, useQueryClient} from "@tanstack/react-query";
import {pomodoroService} from "@/services/pomodoro.service";


export function useCrateSession(){
    const queryClient = useQueryClient()
    const {mutate, isPending:createPending} = useMutation({
        mutationKey:['create new session'],
        mutationFn:()=> pomodoroService.createSession(),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:['get today session']
            })
        }
    })
    return{mutate,createPending}
}