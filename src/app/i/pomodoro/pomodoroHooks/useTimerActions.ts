import {UseUpdateRound} from "@/app/i/pomodoro/pomodoroHooks/useUpdateRound";
import {useLoadSettings} from "@/app/i/pomodoro/pomodoroHooks/useLoadSettings";
import {Dispatch, SetStateAction, useEffect} from "react";
import {IPomodoroRoundResponse} from "@/type/pomodoro.types";

interface useTimerActionsProps{
    activeRound: IPomodoroRoundResponse | undefined
    secondsLeft:number
    setIsRunning:Dispatch<SetStateAction<boolean>>
    rounds :IPomodoroRoundResponse[] | undefined
    setActiveRound:Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
    refetch:()=>void
    isBreakTime:boolean
}
export function useTimerActions({activeRound,isBreakTime,refetch,secondsLeft, setIsRunning, rounds, setActiveRound}:useTimerActionsProps) {
    const {workInterval,intervalsCount} = useLoadSettings()
    const {updateRound, isPending} = UseUpdateRound({refetch})
    useEffect(() => {
        if (secondsLeft===0&&isBreakTime&&activeRound){
            debugger
            updateRound({
                id: activeRound?.id,
                data: {
                    totalSeconds:0,
                    isCompleted: true
                }
            })
        }
    }, [isBreakTime,secondsLeft]);
    const playHandler = () => {
        setIsRunning(true)
        refetch()
    }
    const pauseHandler = () => {

        setIsRunning(false)
        if (activeRound?.id)
            updateRound({
                id: activeRound?.id,
                data: {
                    totalSeconds:secondsLeft,
                    isCompleted: Math.floor(secondsLeft / 60) >= workInterval
                }
            })
        refetch()
    }

    const nextRoundHandler = () => {
        if (!activeRound?.id)return;
        if (intervalsCount&&rounds&&(activeRound.id!==rounds[rounds.length-1].id)) {
            if (rounds?.length>intervalsCount)return;
            for (let i = 0; i < intervalsCount; i++) {
                if (rounds[i].id === activeRound.id) {
                    setActiveRound(rounds[i + 1])
                    updateRound({
                        id: activeRound.id,
                        data: {
                            isCompleted: true,
                            totalSeconds: 0
                        }
                    })
                    return
                }

            }
        }
        if (rounds&&(activeRound.id===rounds[rounds.length-1].id&&!activeRound.isCompleted)){
            setActiveRound(undefined)
            updateRound({
                id: activeRound.id,
                data: {
                    isCompleted: true,
                    totalSeconds: 0
                }
            })
            return;
        }
    }
    const prevRoundHandler = () => {
            if (intervalsCount&&rounds&&(activeRound?.id!==rounds[0].id)&&(activeRound?.id!==rounds[intervalsCount-1].id)) {
                for (let i = 0; i < intervalsCount; i++) {
                    if (rounds[i].id === activeRound?.id) {
                        setActiveRound(rounds[i - 1])
                        updateRound({
                            id: rounds[i - 1].id,
                            data: {
                                isCompleted: false,
                                totalSeconds: workInterval*60
                            }
                        })

                        return
                    }

                }
            }
        if (intervalsCount&&rounds&&(!activeRound?.id)) {
                    setActiveRound(activeRound)
                    updateRound({
                        id:rounds[rounds.length-1].id,
                        data: {
                            isCompleted: false,
                            totalSeconds: workInterval*60
                        }
                    })

                    return

        }else if(intervalsCount&&rounds&&(activeRound?.id===rounds[rounds.length-1].id)){
            setActiveRound(rounds[rounds.length-2])
            updateRound({
                id: rounds[rounds.length-2].id,
                data: {
                    isCompleted: false,
                    totalSeconds: workInterval*60
                }
            })
            return

        }
    }
    return {prevRoundHandler, isPending, nextRoundHandler, playHandler, pauseHandler}
}