import {IPomodoroRoundResponse} from "@/type/pomodoro.types";
import {ChevronLeft, ChevronRight} from "lucide-react";
import Round from "@/app/i/pomodoro/rounds/Round";


interface PomodoroRoundsTypeProps {
    rounds: IPomodoroRoundResponse[] | undefined
    nextRoundHandler: () => void
    prevRoundHandler: () => void
    activeRound: IPomodoroRoundResponse | undefined
}

export function PomodoroRounds(
    {
        rounds, nextRoundHandler, prevRoundHandler,activeRound
    }: PomodoroRoundsTypeProps) {
    return(
        <div className={'pomodoro-rounds'}>
            <button

                onClick={()=>prevRoundHandler()}
            >
                <ChevronLeft size={23}/>
            </button>
            <div className={"round-list"}>
                {rounds&&rounds.map((round,index)=>
                    <Round round={round} activeRound={activeRound} key={index}></Round>)}
            </div>
            <button
                onClick={()=>nextRoundHandler()}
            >
                <ChevronRight size={23}/>
            </button>
        </div>
    )

}