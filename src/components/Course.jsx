const Course = ({courses}) => {

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => {
        const sum = course.parts.reduce((total, exercise)=>{return total += exercise.exercises}, 0)
        return (
        <div key={course.id}>
        <h3>{course.name}</h3>
        {course.parts.map((detail)=>{return <p key={detail.id}>{detail.name} {detail.exercises}</p>})}
        <p><b>total of {sum} exercises</b></p>
        </div>
      );
      })}
      
    </div>
  )
}

export default Course;