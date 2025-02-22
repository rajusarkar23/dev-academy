"use client"
import { Accordion, AccordionItem } from "@heroui/accordion";

export default function ProfileComp() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">

            <div>
                <div className="max-w-xl">
                    <Accordion className="text-white">
                        <AccordionItem 
                            aria-label="Accordion 1"
                            title="Accordion 1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, est.
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

        </div>
    )
}



// in profile

// => enrollments
// => profile details