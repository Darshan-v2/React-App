import React from 'react'
import { ITask } from '../Interface'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Grid, IconButton } from '@material-ui/core'

interface IProps {
    task: ITask
    id: number
    date: Date
    onDelete(taskNameToDelete: number): void
}

const TodoTask = ({ task, onDelete }: IProps) => {
    return (
        <Grid className='task'>
            <Grid>{task.id}.</Grid>
            <Grid>{task.taskName}</Grid>
            <Grid>{task.date.toLocaleString()}</Grid>
            <IconButton id='btn-delete' onClick={() => {
                onDelete(task.id)
                }}><HighlightOffIcon /></IconButton>
        </Grid>
    )
}

export default TodoTask