import axios from 'axios'
import React, { useState } from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { login, logout } from '../features/userSlice'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
    loginText: {
        textAlign: 'center',
        fontSize: '40px',
        color: 'white',
        position: 'relative',
        top: '150px'
    }
})

function LoginForm() {

    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [open, setOpen] = useState(false)
    const [passwordVisbility, setpasswordVisbility] = useState('password')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const handlePasswordVisibility = () => {
        if (passwordVisbility === "password") {
            setpasswordVisbility("text")
            return
        }
        setpasswordVisbility("password")
    }

    const closeLoginModal = () => {
        setOpen(false)
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setEmail(event.target.value)
    }

    const handleSubmit = () => {
        if (email === '' || password === '') {
            alert('Invalid Email or Password')
            closeLoginModal()
        }
        else {
            axios.post('https://reqres.in/api/login', {
                email: email,
                password: password
            })
                .then(result => {
                    alert('Logged in Successful')
                    closeLoginModal()
                    localStorage.setItem("token", result.data.token)
                    dispatch(login({
                        email: email,
                        password: password,
                        loggedIn: true
                    }))
                    navigate('/')
                })
                .catch(error => {
                    alert('Invalid Email or Password')
                    dispatch(logout({
                        loggedIn: false
                    }))
                })
        }
    }

    return (
        <>
            <p className={classes.loginText}>Sign-in</p>
            <div className='inputBox'>
                <input type="text" placeholder="Email"
                    value={email}
                    onChange={handleEmail} className="emailInputBox" />
                <input type={passwordVisbility} placeholder="Password"
                    value={password}
                    onChange={handlePassword} className="passwordInputBox" />
                <Button onClick={handlePasswordVisibility} id="visbilityIcon">
                    {passwordVisbility === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Button>
                <Button variant='contained' onClick={handleSubmit} id='btn-login'>Login</Button>
            </div>
        </>
    )
}

export default LoginForm
