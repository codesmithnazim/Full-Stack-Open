function Total({ course }) {
  let total 
  // course.parts.forEach((element) => {
  //   total += element.exercises;
  // });
  total = course.parts.reduce((acc, b) => {
    console.log(acc, b.exercises)
    return acc + b.exercises;
  },0);
  return <h3>Total number of exercises {total}</h3>;
}
export default Total;
