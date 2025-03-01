import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      heading: "Transformed My Career!",
      para1:
        "I was struggling to break into web development, but this course provided me with the skills and confidence I needed. The lessons are well-structured, easy to follow, and packed with real-world examples. The hands-on projects helped me build a solid portfolio, which ultimately landed me my first job as a full-stack developer.",
      para2:
        "I can’t recommend this course enough! If you're serious about learning web development, this is the best investment you can make in yourself.",
      name: "Alex Thompson",
      jobRole: "Software Engineer at TechWave",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png",
    },
    {
      heading: "Worth Every Penny!",
      para1:
        "I’ve taken several online courses before, but none have been as well-explained and practical as this one. The instructor does a fantastic job of breaking down complex topics into simple, actionable steps. I particularly loved how each module builds on the previous one, making learning seamless and effective.",
      para2:
        "Thanks to this course, I was able to transition from a junior to a mid-level developer within months. If you want to upskill and advance in your career, this is the course for you!",
      name: "Sarah Patel",
      jobRole: "Frontend Developer at CodeCrafters Inc",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
    },
    {
      heading: "From Beginner to Confident Developer",
      para1:
        "When I started this course, I had zero experience in coding. But the structured lessons, engaging explanations, and hands-on projects made learning enjoyable. I especially appreciated the support from the instructor and the community, which kept me motivated throughout the journey.",
      para2:
        "Now, I’m confidently building real-world applications and even freelancing on the side. This course truly changed my life!",
      name: "Diana Rodriguez",
      jobRole: "Freelance Web Developer",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
    },
    {
      heading: "The Best Learning Experience!",
      para1:
        "This course exceeded all my expectations! Every concept was explained with clarity, and the interactive coding exercises made it easy to retain what I learned. The real-world projects helped me apply my knowledge in a meaningful way, giving me the confidence to take on complex challenges.",
      para2:
        "After completing the course, I landed a new job with a 30% salary increase. I couldn't have done it without this amazing course!",
      name: "Priya Sharma",
      jobRole: "Backend Developer at DevMasters",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-black to-violet-900/80 mt-8">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6" />
      <div className="mx-auto max-w-screen-sm">
        <h2 className="mb-4 text-6xl tracking-tight font-extrabold underline underline-offset-3 text-center">
          Testimonials
        </h2>
      </div>
      <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
        {testimonials.map((items, index) => (
          <figure
            className="flex flex-col justify-center items-center p-8 text-center border-b border-gray-200 md:p-12 lg:border-r"
            key={index}
          >
            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-100">
              <h3 className="text-lg font-semibold text-gray-100">
                {items.heading}
              </h3>
              <p className="my-4">{items.para1}</p>
              <p className="my-4">{items.para2}</p>
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              <Image
                className="rounded-full"
                src={items.avatar}
                alt="profile picture"
                width={50}
                height={50}
              />
              <div className="space-y-0.5 font-medium text-left">
                <div>{items.name}</div>
                <div className="text-sm font-light text-gray-100">
                  {items.jobRole}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
