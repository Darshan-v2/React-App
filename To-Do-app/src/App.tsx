import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import Header from './Components/Header'
import AddTask from './Components/AddTask'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@material-ui/core'

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = React.useState(false)
  const [open, setOpen] = useState(false)

  const openSignoutModal = () => {
    setOpen(true)
  }

  const closeSignoutModal = () => {
    setOpen(false)
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  const logOut = () => {
    setSuccess(false)
    setEmail('')
    setPassword('')
  }

  const handleSubmit = () => {
    if (email === '' || password === '') {
      alert('Invalid Email or Password')
      setSuccess(false)
    }

    else {
      axios.post('https://reqres.in/api/login', {
        email: email,
        password: password
      })
        .then(result => {
          alert('Logged in Successful')
          setSuccess(true)
          console.log(result);
          localStorage.setItem("token", result.data.token)
        })
        .catch(error => {
          alert('Invalid Email or Password')
          setSuccess(false)
          console.log(error);
        })
    }
  }

  if (success) {

    return (
      <>
        <Header />
        <p className='email'>Welcome | {email} |</p>

        <PowerSettingsNewIcon id='logout' onClick={openSignoutModal} />

        <Dialog open={open} onClose={closeSignoutModal} >
          <DialogTitle>
            {"Confirm Delete"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to signout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeSignoutModal}>Cancel</Button>
            <Button id="btn-agree" onClick={logOut}>
              Sign-out
            </Button>
          </DialogActions>
        </Dialog>

        <AddTask />
      </>
    )
  }

  return (
    <>
      <div className='inputBox'>
        <input type="text" placeholder="Email"
          value={email}
          onChange={handleEmail} className="emailInputBox" />
        <input type="password" placeholder="Password"
          value={password}
          onChange={handlePassword} className="passwordInputBox" />
        <Button variant='contained' onClick={handleSubmit} id='btn-login'>Login</Button>
      </div>
    </>
  )
}

export default App

