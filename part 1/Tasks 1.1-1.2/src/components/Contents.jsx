import Part from "./Contentparts/Part"

function Contents({exercises, parts}) {
  return (
    <>
     <Part data={{name:parts[0], exercises:exercises[0]}}/>
     <Part data={{name:parts[1], exercises:exercises[1]}}/>
     <Part data={{name:parts[2], exercises:exercises[2]}}/>
     
    </>
  )
}

export default Contents