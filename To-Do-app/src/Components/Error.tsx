import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  about: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center'
  },
})

export default function Error() {
    const classes = useStyles()
  return (
    <h1 className={classes.about}>Error Page not Found</h1>
  )
}
