"use client"
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";

export default function ProfileComp({email, name, courses}: {email: string, name: string, courses: string[]}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">

            <div>
                <div className="max-w-xl">
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
                                <p>{items.slug}</p>
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