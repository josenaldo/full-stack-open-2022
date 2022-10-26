import { useState } from 'react'

import './App.css'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>
}

const Statistic = ({ text, value }) => {
    return (
        <div className="stat">
            <span>{text}</span>
            <span>{value}</span>
        </div>
    )
}

function App() {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div className="app">
            <Title text="Give feedback" />
            <div className="feedback">
                <Button handleClick={() => setGood(good + 1)} text="good" />
                <Button
                    handleClick={() => setNeutral(neutral + 1)}
                    text="neutral"
                />
                <Button handleClick={() => setBad(bad + 1)} text="bad" />
            </div>

            <Title text="Statistics" />

            <div className="statistics">
                <Statistic text="Good" value={good} />
                <Statistic text="Neutral" value={neutral} />
                <Statistic text="Bad" value={bad} />
            </div>
        </div>
    )
}

export default App
