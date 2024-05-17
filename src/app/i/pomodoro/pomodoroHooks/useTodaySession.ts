import {useQuery} from "@tanstack/react-query";
import {pomodoroService} from "@/services/pomodoro.service";
import {Dispatch, SetStateAction, useEffect} from "react";
import {IPomodoroRoundResponse} from "@/type/pomodoro.types";




interface UseTodaySessionTypeProp {
    setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
    setSecondsLeft:Dispatch<SetStateAction<number>>
}
export function useTodaySession({
    setActiveRound,setSecondsLeft
                                }:UseTodaySessionTypeProp) {
    const {data:sessionResponse,isLoading,refetch,isSuccess} = useQuery({
        queryKey:['get today session'],
        queryFn:()=>pomodoroService.getTodaySession()
    })
    const rounds = sessionResponse?.data.rounds
    useEffect(() => {
        if (isSuccess&&rounds){
            const activeRound = rounds?.find((round) => round.isCompleted===false)
            if (activeRound){
                setActiveRound(activeRound)
                setSecondsLeft(activeRound.totalSeconds)


        }}
    }, [sessionResponse,isSuccess,setActiveRound,setSecondsLeft,refetch]);


    return{sessionResponse,isLoading,isSuccess,refetch}
}