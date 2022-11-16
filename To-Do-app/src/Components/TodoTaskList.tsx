import React, { Dispatch, SetStateAction } from 'react'
import { Grid } from '@material-ui/core'
import { ITask } from '../Interface'
import TodoTask from './TodoTask'

interface Props {
    todoList: ITask[]
    setTodoList: Dispatch<SetStateAction<ITask[]>>
}

function TodoTaskList({ todoList, setTodoList }: Props) {

    // const [todoList, setTodoList] = useState<ITask[]>([])

    const deleteTask = (taskNameToDelete: number): void => {
        window.alert("Are you sure?")
        setTodoList(todoList.filter((task) => {
            return task.id !== taskNameToDelete
        }))
    }

    return (
        <Grid className='todoList'>
            {todoList.map((task) => {
                return <TodoTask task={task} id={task.id} date={task.date} onDelete={deleteTask} />
            })}
        </Grid>
    )
}

export default TodoTaskList