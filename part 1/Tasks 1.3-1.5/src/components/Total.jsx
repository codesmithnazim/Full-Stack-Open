function Total({ course }) {
  let total = 0;
  course.parts.forEach((element) => {
    total += element.exercises;
  });
  return <p>Total number of exercises {total}</p>;
}
export default Total;
