import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  txt: {
    color: 'white',
    fontSize: '20px',
    textAlign:'justify',
    width:'30%',
    position:'relative',
    left:'35%'
  },
})

function Home() {
  const classes = useStyles()
  return (
    <div className={classes.txt}>
      <p>To-Do-List App is a kind of app that
        generally used to maintain our day-to-day tasks
        or list everything that we have to do,
        with the most important tasks at the top of the list,
        and the least important tasks at the bottom.
        It is helpful in planning our daily schedules.</p>
    </div>

  )
}

export default Home