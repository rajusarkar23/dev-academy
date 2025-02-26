import { getProfileDetails } from '@/app/actions/get-student-profile-details/action'
import EnrollmentsComp from '@/components/student/EnrollmentsComp'

const Enrollments = async () => {
    const data = await getProfileDetails()
    const enrollments = data.studentDetails.courses
    
  return (
    <div>
        <EnrollmentsComp enrolled={enrollments}/>
    </div>
  )
}

export default Enrollments