import { getProfileDetails } from '@/app/actions/get-student-profile-details/action'
import ProfileComp from '@/components/student/ProfileComp'
import React from 'react'

const Profile = async () => {

  const data = await getProfileDetails()

  console.log(data.studentDetails);
  

  return (
    <div>
      <ProfileComp courses={data.studentDetails.courses} email={data.studentDetails.email} name={data.studentDetails.name}/>
    </div>
  )
}

export default Profile