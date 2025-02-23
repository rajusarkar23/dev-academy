import { getProfileDetails } from '@/app/actions/get-student-profile-details/action'
import ProfileComp from '@/components/student/ProfileComp'
import React from 'react'

const Profile = async () => {

  const data = await getProfileDetails()

  console.log(data.student);
  

  return (
    <div>
      <ProfileComp />
    </div>
  )
}

export default Profile