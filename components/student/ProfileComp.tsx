"use client"
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";

interface courses {
    courseName: string,
    slug: string,
    courseShortDescription: string,
    instructor: string,
    startingDate: string,
    endDate: string,
    imageUrl: string
}

export default function ProfileComp({email, name, courses}: {email: string, name: string, courses: courses[]}) {
    console.log(courses);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">

            <div>
                <div className="max-w-md">
                    <Accordion className="text-white">
                        <AccordionItem 
                            aria-label="Student profile details"
                            title="Your profile details">
                            <p>Name: {name}</p>
                            <p>Email: {email}</p>
                            <Button color="primary">Edit</Button>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div>
                    {
                        courses.map((items, index) => (
                            <div key={index}>
                                <p>{items.courseName}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}



// in profile

// => enrollments
// => profile details