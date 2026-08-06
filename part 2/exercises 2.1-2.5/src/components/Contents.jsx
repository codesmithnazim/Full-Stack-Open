import Part from "./Contentparts/Part"

function Contents({courses}) {
  return (
    <>
    {
      courses.map(course=>{
        return   <Part key={crypto.randomUUID()} data={{name:course.name, exercises:course.exercises}}/>
      })
    }
     {/* <Part /> Manual way 
     <Part data={{name:course.parts[1].name, exercises:course.parts[1].exercises}}/>
     <Part data={{name:course.parts[2].name, exercises:course.parts[2].exercises}}/> */}
     
    </>
  )
}

export default Contents