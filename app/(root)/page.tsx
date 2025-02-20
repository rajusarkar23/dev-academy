import AllCourses from "@/components/page/AllCourses";
import Courses from "@/components/page/Courses";
import Hero from "@/components/page/Hero";
import OurStats from "@/components/page/OurStats";

export default function Home() {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <section>
        <OurStats />
      </section>
      <section>
        <Courses />
      </section>
      <section>
        <AllCourses />
      </section>
    </main>
  );
}
