export interface IAuthForm {
    email: string
    password: string
}

export interface IUser {
    email: string
    name: string
    id: string
    password: string
    workInterval?: number
    breakInterval?: number
    intervalsCount?: number
}
export interface IAuthResponse{
    accessToken:string
    user:IUser
}
export type TypeUserForm = Omit<IUser ,'id'& {password?:string}>