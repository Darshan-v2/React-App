import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

function UserProfiles() {
  return (
    <Link to="/userprofiles"><Button variant='contained' id="btn-user">User Profile</Button></Link>
  )
}

export default UserProfiles