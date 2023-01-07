const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map(part => <Part key={part.id} part={part} />)
};

const Totals = ({ parts }) => {
  const exerciseCount = parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  )
  return (
    <em>
      Total of {exerciseCount} exercises
    </em>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Totals parts={course.parts} />
    </>
  )
}

export default Course