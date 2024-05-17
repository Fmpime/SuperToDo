import {IPomodoroRoundResponse} from "@/type/pomodoro.types";
import {ChevronLeft, ChevronRight} from "lucide-react";


interface PomodoroRoundsTypeProps {
    rounds: IPomodoroRoundResponse[] | undefined
    nextRoundHandler: () => void
    prevRoundHandler: () => void
    activeRound: IPomodoroRoundResponse | undefined
}

export function PomodoroRounds(
    {
        rounds, nextRoundHandler, prevRoundHandler,
    }: PomodoroRoundsTypeProps) {
    return(
        <div>
            <button

                onClick={()=>prevRoundHandler()}
            >
                <ChevronLeft size={23}/>
            </button>
            <div>
                {rounds&&rounds.map((round,index)=>{
                    return(
                        <div key={index}>
                            {round.isCompleted?'true':'false'}
                        </div>
                    )
                })}
            </div>
            <button
                onClick={()=>nextRoundHandler()}
            >
                <ChevronRight size={23}/>
            </button>
        </div>
    )

}