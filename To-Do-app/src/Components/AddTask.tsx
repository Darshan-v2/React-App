import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { ITask } from '../Interface'
import TodoTaskList from './TodoTaskList'
import { Button } from '@mui/material'
import TaskPerfom from './TaskPerfom'

function AddTask() {

    const [todoList, setTodoList] = useState<ITask[]>([])
    const [open, setOpen] = useState(false)
    const [count, setCount] = useState(1)
    const title = "Add"

    const handleClickOpen = () => {
        setOpen(true)
    }

    return (
        <Grid>
            <Grid className='btn-flex'>
                <Button id='btn-addtask' variant='contained' onClick={handleClickOpen}>Add Task</Button>
            </Grid>

            <TodoTaskList todoList={todoList} setTodoList={setTodoList} />

            {open && <TaskPerfom slno={count} setOpen={setOpen} title={title} open={open}
                addTask={(task: ITask) => {
                    setCount((prevCount) => prevCount + 1)
                    setTodoList([...todoList, task])
                }} />}
        </Grid>
    )
}

export default AddTask

