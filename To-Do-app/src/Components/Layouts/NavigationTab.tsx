import React from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  header: {
    color: 'white',
    fontSize: '25px',
    padding: '10px',
    backgroundColor: '#162f40'
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    left: '50px'
  },
  home: {
    color: 'white',
    padding: '10px',
    fontSize: '20px',
    textDecoration: 'none',
    position: 'relative',
    bottom: '45px',
    columnGap: '20px'
  },
  about: {
    color: 'white',
    padding: '10px',
    fontSize: '20px',
    textDecoration: 'none',
    position: 'relative',
    bottom: '45px',
    columnGap: '20px'
  }
})

function NavigationTab() {

  const classes = useStyles()

  return (
    <>
      <div>
        <Grid className={classes.header}>To Do List</Grid>
        <Link to="/login"><Button variant='contained' id="btn-mainLogin">Login</Button></Link>
        <div className={classes.text}>
          <Link to="/" className={classes.home}>Home</Link>
          <Link to="/about" className={classes.about}>About us</Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default NavigationTab