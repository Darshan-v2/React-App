import { GridSize } from "@material-ui/core"
import { Dispatch, SetStateAction } from "react"
export interface ITask {
    taskName: string
    description: string
    id: number
    date: Date
}
export interface ITasks {
    task?: ITask
    open: boolean
    title: string
    addTask?(task:ITask):void;
    onEdit?(taskEditId: number, taskEditName: string, taskEditDescription: string): void
    setOpen: Dispatch<SetStateAction<boolean>>
    slno?: number
}
export interface IUser {
    avatar: string
    first_name: string
    last_name: string
    email: string
    id: number
  }
