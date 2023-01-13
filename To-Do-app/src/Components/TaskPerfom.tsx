import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { ITask, ITasks } from '../Interface'
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles({
    validText: {
        fontSize: 13,
        color: '#ee2b2b'
    }
})

function TaskPerfom({ task, onEdit, title, open, setOpen, addTask, slno }: ITasks) {

    const classes = useStyles()
    const { register, handleSubmit, setValue, formState, formState: { errors } } = useForm<ITask>({ mode: 'onChange' })
    const closeEditModal = () => {
        setOpen(false)
    }
    useEffect(
        () => {
            if (task) {
                setValue("taskName", task.taskName)
                setValue("description", task.description)
            }
        }, [task])

    const onSave = (data: ITask) => {
        if (title === "Edit" && task) {
            if (onEdit) {
                onEdit(task.id, data.taskName, data.description)
            }

        }
        else if (title === "Add" && addTask) {
            const date = new Date()
            if (slno) {
                const newTask = {
                    id: slno,
                    taskName: data.taskName,
                    description: data.description,
                    date: date
                }
                addTask(newTask)
                console.log(newTask);
            }
        }
        setOpen(false)
    }

    return (
        <>
            <Dialog open={open} onClose={closeEditModal}>
                <form onSubmit={handleSubmit(onSave)}>
                    <DialogTitle>{title} Task</DialogTitle>

                    <DialogContent>
                        <TextField
                            {...register('taskName', { required: true })}
                            autoFocus
                            margin='normal'
                            label='TaskName'
                            name='taskName'
                            type='text'
                            fullWidth
                            variant='outlined'
                        />
                        {errors.taskName && <span className={classes.validText}>This field cannot be Empty</span>}
                        <TextField
                            {...register('description', { required: true })}
                            autoFocus
                            margin='normal'
                            label='Description'
                            name='description'
                            type='text'
                            fullWidth
                            variant='outlined'
                        />
                        {errors.description && <span className={classes.validText}>This field cannot be Empty</span>}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={closeEditModal}>Cancel</Button>
                        <Button type='submit' variant='contained' color='primary' disabled={!formState.isValid}
                            onClick={() => {
                                if (onEdit && task) {
                                    onEdit(task.id, task.taskName, task.description)
                                }
                            }}
                        >
                            Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default TaskPerfom