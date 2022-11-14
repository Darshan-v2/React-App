import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    header: {
        backgroundColor: '#282c34',
        textAlign: 'center',
        color: 'white',
        fontSize: '25px',
        padding: '10px',
    },
})

function Header() {
    const classes = useStyles();
    return (
        <Grid className={classes.header}>To Do List</Grid>
    )
}

export default Header