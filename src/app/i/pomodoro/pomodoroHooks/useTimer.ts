import {useEffect, useState} from "react";
import {IPomodoroRoundResponse} from "@/type/pomodoro.types";
import {useLoadSettings} from "@/app/i/pomodoro/pomodoroHooks/useLoadSettings";


export const useTimer = ()=>{
    const {breakInterval,workInterval} = useLoadSettings()
    const [isRunning,setIsRunning] = useState(false)
    const [isBreakTime,setIsBreakTime] = useState(false)
    const [secondsLeft,setSecondsLeft] = useState(workInterval*60)
    const [activeRound,setActiveRound] = useState<IPomodoroRoundResponse | undefined>()

    useEffect(() => {
        let interval:NodeJS.Timeout | null =null

        if (isRunning&&!activeRound?.isCompleted&&activeRound?.id){
            interval = setInterval(()=>{
                setSecondsLeft(secondsLeft=>secondsLeft-1)
            },10)
        }else if (!isRunning&&secondsLeft!==0&&interval){
            clearInterval(interval)
        }
        return ()=>{
            if (interval) clearInterval(interval)

        }
    }, [isRunning,secondsLeft,workInterval,activeRound]);
    useEffect(() => {
        if (secondsLeft>0)return
        if (!isBreakTime) {
            setIsBreakTime(true)
            setSecondsLeft(breakInterval*60)

        }else{
            setIsBreakTime(false)
            setSecondsLeft(workInterval*60)
        }

    }, [secondsLeft]);




    return{isBreakTime,activeRound,secondsLeft,setActiveRound,setIsRunning,setSecondsLeft,isRunning,workInterval}
}