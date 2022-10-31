const Total = ({ course }) => {
    const total = course.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return ({`Number of exercises ${total}`}
        <p>
            <strong>{`Number of exercises ${total}`}</strong>
        </p>
    )
}

export default Total
