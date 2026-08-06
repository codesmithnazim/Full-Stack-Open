import Part from "./Contentparts/Part"

function Contents({course}) {
  return (
    <>
     <Part data={{name:course.parts[0].name, exercises:course.parts[0].exercises}}/>
     <Part data={{name:course.parts[1].name, exercises:course.parts[1].exercises}}/>
     <Part data={{name:course.parts[2].name, exercises:course.parts[2].exercises}}/>
     
    </>
  )
}

export default Contents