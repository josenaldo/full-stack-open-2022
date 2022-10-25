const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    }

    return (
        <div>
            <Header course={course} />

            <Content course={course} />

            <Total course={course} />
        </div>
    )
}

const Header = (props) => {
    return <h1>{props.course.name}</h1>
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map((part) => (
                <Part part={part} key={part.name} />
            ))}
        </div>
    )
}

const Total = (props) => {
    const total = props.course.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return <p>{`Number of exercises ${total}`}</p>
}

export default App
