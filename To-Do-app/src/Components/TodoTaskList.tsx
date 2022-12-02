import React, { Dispatch, SetStateAction } from 'react'
import { Grid } from '@material-ui/core'
import { ITask } from '../Interface'
import TodoTask from './TodoTask'

interface Props {
    todoList: ITask[]
    setTodoList: Dispatch<SetStateAction<ITask[]>>
}

function TodoTaskList({ todoList, setTodoList }: Props) {

    const deleteTask = (taskIdToDelete: number): void => {
        setTodoList(todoList.filter((task) => {
            return task.id !== taskIdToDelete
        }))
    }

    const editTask = (taskEditId: number, taskEditName: string, taskEditDescription: string): void => {
        setTodoList((todoList) =>
        (todoList.filter((task) => {
            if (task.id === taskEditId) {
                task.taskName = taskEditName
                task.description = taskEditDescription
                return {
                    ...task,
                    taskName: taskEditName,
                    description: taskEditDescription
                }
            }
            return task
        }))
        )
    }

    return (
        <>
            <table className='tableTaskList'>
                <thead className='tableTask'>
                    <tr className='task'>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date & Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </table>

            <Grid>
                {todoList.map((task) => {
                    return <TodoTask task={task} description={task.description} id={task.id} date={task.date} onDelete={deleteTask} onEdit={editTask} />
                })}
            </Grid>
        </>
    )
}

export default TodoTaskList