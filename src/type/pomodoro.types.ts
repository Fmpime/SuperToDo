import type {IBase} from "@/type/root.types";
import {ITaskResponse} from "@/type/task.types";

export interface IPomodoroRoundResponse extends IBase {

    isCompleted?:boolean
    totalSeconds:number
}
export interface IPomodoroSessionResponse extends IBase{
    isCompleted?:boolean
    rounds?:IPomodoroRoundResponse[]
}
export type TypePomodoroRoundState = Partial<Omit<IPomodoroRoundResponse, 'id'|'updatedAt'|'createdAt'>>
export type TypePomodoroSessionState = Partial<Omit<IPomodoroSessionResponse, 'id'|'updatedAt'|'createdAt'>>