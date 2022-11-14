import React, { ChangeEvent, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import { ITask } from '../Interface'
import TodoTask from './TodoTask';
import { Button } from '@mui/material'

const useStyles = makeStyles({

    addTask: {
        paddingLeft: '600px',
        paddingTop: '100px',
    },

    addText: {
        fontSize: '20px'
    }
})

function AddTask() {

    const [task, setTask] = useState<string>("");
    const [todoList, setTodoList,] = useState<ITask[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === "task")
            setTask(event.target.value)
    }

    const addTask = (): void => {
        const newTask = { taskName: task }
        setTodoList([...todoList, newTask])
        setTask("");
    }

    const completeTask = (taskNameToDelete: string): void => {
        setTodoList(todoList.filter((task) => {
            return task.taskName !== taskNameToDelete
        }))
    }

    const classes = useStyles();
    return (
        <>
            <Grid className={classes.addTask} >
                <Grid className={classes.addText}> Add Task </Grid>
                <input typeof='text' placeholder='Enter task here' name="task" value={task} onChange={handleChange}></input>
                <Button id='btn-add' variant="contained" onClick={addTask}>Add Task</Button>
            </Grid >
            <Grid className='todoList'>
                {todoList.map((task: ITask) => {
                    return <TodoTask task={task} completeTask={completeTask} />;
                })}
            </Grid>
        </>
    )
}

export default AddTask

