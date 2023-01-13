import React from 'react'
import { ITask } from '../Interface'
import TaskPerfom from './TaskPerfom'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Grid, makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import EditIcon from '@mui/icons-material/Edit'

const useStyles = makeStyles({
    validText: {
        fontSize: 13,
        color: '#ee2b2b'
    }
})
interface IProps {
    task: ITask
    description: string
    id: number
    date: Date
    onDelete(taskIdToDelete: number): void
    onEdit(taskEditId: number, taskEditName: string, taskEditDescription: string): void }

const TodoTask = ({ task, onDelete, onEdit }: IProps) => {
    const [save, setSave] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const title = "Edit"
    const openDeleteModal = () => {
        setSave(true)
    }
    const closeDeleteModal = () => {
        setSave(false)
    }
    const openEditModal = () => {
        setOpen(true)
    }
    
    return (
        <>
            <Grid>
                <div className='tableTaskList'>
                    <div className="tableTask">
                        <td>{task.id}.</td>
                        <td>{task.taskName}</td>
                        <td>{task.description}</td>
                        <td>{task.date.toLocaleString()}</td>
                        <td>
                            <EditIcon onClick={openEditModal} id='btn-edit' />
                            {open && <TaskPerfom setOpen={setOpen} title={title} open={open} task={task} onEdit={onEdit} />}
                            <HighlightOffIcon onClick={openDeleteModal} id='btn-delete' />

                            {/* Delete Dialog */}
                            <Dialog open={save} onClose={closeDeleteModal} >
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
                        </td>
                    </div>
                </div>
            </Grid>
        </>
    )
}

export default TodoTask