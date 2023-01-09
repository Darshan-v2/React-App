import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Button } from '@material-ui/core'
import EditForm from './EditForm'
import { IUser } from '../Interface'
import Box from '@mui/material/Box'

const useStyles = makeStyles({
  validText: {
    fontSize: 13,
    color: '#ee2b2b'
  }
})

function PostForm() {

  const classes = useStyles()
  const [users, setUsers] = useState<IUser[]>([])
  const [user, setUser] = useState<IUser>()
  const [open, setOpen] = useState(false)
  const [loggedIn, setLogin] = React.useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>()

  const handleEdit = (u: IUser) => {
    setOpen(true)
    setUser(u)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickClose = () => {
    setOpen(false)
  }

  const api = axios.create({
    baseURL: "https://reqres.in/api/users"
  })

  const addProfile = (data: IUser) => {

    api.post(`baseURL`, { data })
      .then((res) => {
        const apires = res.data.data
        const id = res.data.id
        const newUser = {
          id,
          ...apires
        }
        const finalData = [newUser, ...users]
        setUsers(finalData)
        handleClickClose()
        setLogin(true)
      })
      .catch(err => {
        console.error("error", err)
      })
  }

  const updateTask = (data: IUser) => {
    api.put(`https://reqres.in/api/users/${data.id}`, data)
      .then((res) => {
        setUsers(
          users.map((u) => {
            if (u.id === user?.id) {
              u.email = res.data.email
              u.first_name = res.data.first_name
            }
            return u;
          })
        )
        handleClickClose()
      })
      .catch(err => {
        console.error("error", err)
      })
  }
  const deleteTask = (id: number) => {
    // eslint-disable-next-line
    api.delete('${id}');
    setUsers(users.filter((u) => u.id !== id))
  }

  const getUser = () => {
    api.get('')
      .then((res) => {
        setUsers(res.data.data)
        console.log("data", res.data.data)
      })
      .catch(err => {
        console.error("not found", err)
      })
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line
  }, [])

  return !loggedIn ? (
    <>
      <Grid className='btn-create'>
        <Button id='btn-createtask' variant='contained' onClick={handleClickOpen}>Create Profile</Button>
      </Grid>
      <div className='createTask'>
        <Dialog open={open} onClose={handleClickClose}>
          <form>
            <DialogTitle>Create Profile</DialogTitle>

            <DialogContent>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Enter a valid Email'
                    },
                  })}
                  autoFocus
                  margin='normal'
                  label='Email'
                  name='email'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={!!errors["email"]}
                  helperText={
                    errors["email"] ? errors["email"].message
                      : ""
                  }
                />
                <TextField
                  {...register('first_name')}
                  autoFocus
                  margin='normal'
                  label='First_name'
                  name='first_name'
                  type='text'
                  fullWidth
                  variant='outlined'
                />
                {errors.first_name && <span className={classes.validText}>This field cannot be Empty</span>}
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClickClose}>Cancel</Button>
              <Button type='submit' variant='contained' color='primary'
                onClick={handleSubmit(addProfile)}>
                Save</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  ) : (
    <>
      {users.map((u: IUser) => {
        return (
          <div key={u.id}>
            <div>
              <div className='createTask'>
                <h3>
                  {u?.first_name} {u?.last_name}
                </h3>
                <div>{u?.email}</div>
                <Button onClick={() => { handleEdit(u) }}>Edit</Button>
                <Button onClick={() => deleteTask(u.id)}>Delete</Button>

              </div>
            </div>
          </div>
        )
      })
      }

      {open &&
        <EditForm
          open={open}
          handleClickClose={handleClickClose}
          u={user ? user : null}
          updateTask={updateTask}
        />
      }
    </>
  )
}

export default PostForm