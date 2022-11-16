import React, { ChangeEvent, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { ITask } from '../Interface'
import TodoTaskList from './TodoTaskList'
import { Button } from '@mui/material'

const useStyles = makeStyles({

    addTask: {
        paddingLeft: '400px',
        paddingTop: '100px'
    },

    addText: {
        fontSize: '20px'
    }
})

function AddTask() {

    const [task, setTask] = useState<string>("")
    const [todoList, setTodoList] = useState<ITask[]>([])

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTask(event.target.value)
    }

    const addTask = (): void => {
        const id = todoList.length + 1
        const date = new Date()
        const newTask = { taskName: task, id: id, date: date }
        todoList.push(newTask)
        // setTodoList([...todoList, newTask])
        setTask("")
        
    }

    const classes = useStyles()
    return (
        <>
            <Grid className={classes.addTask} >
                <Grid className={classes.addText}> Add Task </Grid>
                <TextField name="task" label="Task Name" variant="filled" value={task} onChange={handleChange}/>
                <Button id='btn-add' variant="contained" onClick={addTask}>Add Task</Button>
            </Grid >
            <TodoTaskList todoList={todoList} setTodoList={setTodoList} />
        </>
    )
}

export default AddTask

