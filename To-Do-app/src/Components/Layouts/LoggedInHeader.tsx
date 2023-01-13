import React from 'react'
import SignOutModal from '../SignOutModal'
import { Link, Outlet } from 'react-router-dom'
import { Grid, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'
const useStyles = makeStyles({
    header: {
        color: 'white',
        fontSize: '25px',
        padding: '10px',
        backgroundColor: '#162f40'
    },
    text: {
        display: 'flex',
        justifyContent: 'center'
    },
    navbarlist: {
        color: 'white',
        padding: '10px',
        fontSize: '17px',
        textDecoration: 'none',
        columnGap: '20px'
    }
})

function LoggedInHeader() {
    const classes = useStyles()
    const { username } = useSelector(selectUser)
    const location = useLocation()

    const currentTab = () => {
        let path = location.pathname;
        if (path === "/") return 1
        else if (path === "/addtask") return 2
        else if (path === "/postform") return 3
        else if (path === "/userprofiles") return 4
    }

    const [value, setValue] = React.useState(currentTab)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <Grid className={classes.header}>To Do List</Grid>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary">
                    <Tab value={1} label='Dashboard' key={1} to='/' component={Link} id="navBarList" />
                    <Tab value={2} label='Add Task' key={2} to='/addtask' component={Link} id="navBarList" />
                    <Tab value={3} label='Add Users' key={3} to='/postform' component={Link} id="navBarList" />
                    <Tab value={4} label='User Profiles' key={4} to='/userprofiles' component={Link} id="navBarList" />

                </Tabs>
            </Box>
            <p className='email'>Welcome | {username} |</p>
            <SignOutModal />
            <Outlet />
        </>
    )
}

export default LoggedInHeader

