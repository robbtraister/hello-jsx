'use strict'

import React from 'react'

import Loading from '../../components/loading'
import { useStore } from '../../store'

const Profile = (props) => {
  const { get } = useStore()

  const profile = get('profile')

  return (profile)
    ? <>
      <div>{profile.name}</div>
      <div>{profile.address}</div>
    </>
    : <Loading />
}

export default Profile
