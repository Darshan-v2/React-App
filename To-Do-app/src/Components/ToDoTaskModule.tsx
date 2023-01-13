import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    choice: {
      color: 'white',
      display: 'flex',
      justifyContent: 'center'
    },
  })

function ToDoTaskModule() {
    const classes = useStyles()
    return (
        <h1 className={classes.choice}>Select your Choice!</h1>
    )
}

export default ToDoTaskModule