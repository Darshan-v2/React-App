import React, { useState } from 'react'
import { ITask } from '../Interface'
import EditIcon from '@mui/icons-material/Edit'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Grid, TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm} from "react-hook-form";

interface IProps {
    task: ITask
    description: string
    id: number
    date: Date

    onDelete(taskNameToDelete: number): void
    onEdit(taskEditId: number, taskEditName: string, taskEditDescription: string): void
}

const TodoTask = ({ task, onDelete, onEdit }: IProps) => {

    const [open, setOpen] = useState(false)
    const [name, setName] = useState<string>(task.taskName)
    const [description, setDescription] = useState<string>(task.description)
    const { register, handleSubmit, formState, formState: { errors } } = useForm<ITask>({mode: 'onChange'})

    const openDeleteModal = () => {
        setOpen(true)
    }

    const closeDeleteModal = () => {
        setOpen(false)
    }

    const [save, setSave] = useState(false)

    const openEditModal = () => {
        setSave(true)
    }

    const closeEditModal = () => {
        setSave(false)
    }

    const onSave = (data:ITask) => {
     console.log(data);
        setName(data.taskName)
        setDescription(data.description)
    }
    
    return (
        <>
            <Grid className='taskList'>
                <Grid className='task'>
                    <Grid>{task.id}.</Grid>
                    <Grid>{task.taskName}</Grid>
                    <Grid>{task.description}</Grid>
                    <Grid>{task.date.toLocaleString()}</Grid>
                    <EditIcon onClick={openEditModal} id='btn-edit' />
                    <HighlightOffIcon onClick={openDeleteModal} id='btn-delete' />
                </Grid>
            </Grid>

            {/* Delete Dialog */}
            <Dialog open={open} onClose={closeDeleteModal} >
                <DialogTitle>
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteModal}>Disagree</Button>
                    <Button id="btn-agree" onClick={() => {
                        onDelete(task.id); closeDeleteModal()
                    }}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}

            <Dialog open={save} onClose={closeEditModal}>
                <form onSubmit={handleSubmit(onSave)}>
                    <DialogTitle>Edit Task</DialogTitle>

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
                            value={name}

                            // error
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setName(event.target.value)
                            }
                        />
                        {errors.taskName && <span>This field cannot be Empty</span>}
                        <TextField
                            {...register('description', { required: true })}
                            autoFocus
                            margin='normal'
                            label='Description'
                            name='description'
                            type='text'
                            fullWidth
                            variant='outlined'
                            value={description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setDescription(event.target.value)
                        } 
                        />
                        {errors.description && <span>This field cannot be Empty</span>}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={closeEditModal}>Cancel</Button>
                        <Button type='submit' variant='contained' color='primary' disabled={!formState.isValid}
                        onClick={() => {
                            onEdit(task.id, name, description);
                            // const multipleValues = getValues(["taskName", "description"]);
                            closeEditModal();
                        }}
                        >
                            Save</Button>
                    </DialogActions>
                </form>
            </Dialog>


        </>
    )
}

export default TodoTask