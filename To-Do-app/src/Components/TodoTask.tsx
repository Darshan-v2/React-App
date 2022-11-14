import React from 'react'
import { ITask } from '../Interface';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Grid, IconButton } from '@material-ui/core';

interface Props {
    task: ITask;
    completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
    return (
        <Grid className='task'>
            <Grid className='content'>
                <Grid>{task.taskName}</Grid>
            </Grid>
            <IconButton id='btn-delete' onClick={() => { 
                completeTask(task.taskName);
            }}><HighlightOffIcon/></IconButton>
        </Grid>
    )
}

export default TodoTask