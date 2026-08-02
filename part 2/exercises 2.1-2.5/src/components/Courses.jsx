import Header from "./Header";
import Contents from "./Contents";
import Total from "./Total";

function Courses({ courses }) {
  return (
    <div  className="courses">
      {courses.map((course) => {
        return (
          <div className="individualCourse" key={course.id }>
            <Header course={course} />
            <Contents courses={course.parts} />
            <Total course={course} />
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
