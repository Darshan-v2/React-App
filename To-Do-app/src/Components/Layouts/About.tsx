import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  about: {
    color: 'white',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
})

function About() {
  const classes = useStyles()
  return (
    <p className={classes.about}>To-Do-List App is a kind of app that generally used to</p>
  )
}

export default About