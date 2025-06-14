import { getProfileDetails } from '@/app/actions/get-student-profile-details/action'
import ProfileComp from '@/components/student/ProfileComp'
import React from 'react'

const Profile = async () => {
  const data = await getProfileDetails()
  console.log(data.studentDetails.profileImage);
  
  return (
    <div>

      <ProfileComp email={data.studentDetails.email} name={data.studentDetails.name} profileImage = {data.studentDetails.profileImage}/>
    </div>
  )
}

export default Profile