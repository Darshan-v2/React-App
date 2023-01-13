import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/userSlice'

function SignOutModal() {

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const openSignoutModal = () => {
    setOpen(true)
  }

  const closeSignoutModal = () => {
    setOpen(false)
  }

  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logout({
      loggedIn: false
    }))
    navigate('/')
  }

  return (
    <>
      <PowerSettingsNewIcon id='logout' onClick={openSignoutModal} />
      <Dialog open={open} onClose={closeSignoutModal}>
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
    </>
  )
}

export default SignOutModal