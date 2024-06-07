import {useTimer} from "@/app/i/pomodoro/pomodoroHooks/useTimer";
import {useTimerActions} from "@/app/i/pomodoro/pomodoroHooks/useTimerActions";
import {useTodaySession} from "@/app/i/pomodoro/pomodoroHooks/useTodaySession";
import {formatTime} from "@/app/i/pomodoro/format-time";
import Loader from "@/components/ui/loader/Loader";
import {PomodoroRounds} from "@/app/i/pomodoro/rounds/PomodoroRounds";
import {Pause, Play, RefreshCcw} from "lucide-react";
import {useDeleteSession} from "@/app/i/pomodoro/pomodoroHooks/useDeleteSession";
import {useCrateSession} from "@/app/i/pomodoro/pomodoroHooks/useCrateSession";

const Pomodoro = () => {
const {
    activeRound,
    setActiveRound,
    setIsRunning,
    setSecondsLeft,
    secondsLeft,workInterval,
isRunning,isBreakTime}=  useTimer()

    const {mutate,createPending} = useCrateSession()
    const {isLoading,sessionResponse,refetch} = useTodaySession({setActiveRound,setSecondsLeft})
    const rounds = sessionResponse?.data?.rounds
    const actions = useTimerActions({activeRound,isBreakTime,secondsLeft,setIsRunning,refetch,rounds,setActiveRound})
    const {deleteSession,deletePending} = useDeleteSession(()=> {
        setSecondsLeft(workInterval * 60)
    },refetch)
    return (
        <div className={"pomodoro"}>
            {!isLoading&&(
                <div className={"pomodoro-timer"}>{formatTime(secondsLeft)}</div>
            )}
            {isLoading?(
                <Loader/>
            ):sessionResponse?.data?(
                <>
                <PomodoroRounds
                    rounds={rounds}
                    nextRoundHandler={actions.nextRoundHandler}
                    prevRoundHandler={actions.prevRoundHandler}
                    activeRound={activeRound}
                ></PomodoroRounds>
                    <button
                        onClick={isRunning?actions.pauseHandler:actions.playHandler}
                        disabled={actions.isPending}
                    >

                        {isRunning?<Pause size={30}/>:<Play size={30}/>}
                    </button>
                    <button
                        onClick={()=>{
                            setIsRunning(false)
                            deleteSession(sessionResponse?.data.id)
                        }}
                        disabled={deletePending}
                    >
                        <RefreshCcw size={20}/>
                    </button>
                </>
            ):(
                <button onClick={()=>mutate()}
                    disabled={createPending}
                >Create</button>

            )
            }
        </div>
    );
};

export default Pomodoro;