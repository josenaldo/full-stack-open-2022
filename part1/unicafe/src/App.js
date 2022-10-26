import { useState } from 'react'

import './App.css'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
    return (
        <div className="stat">
            <span>{text}</span>
            <span>{value}</span>
        </div>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = (good / all) * 100

    return (
        <>
            {all > 0 ? (
                <div className="statistics">
                    <StatisticLine text="Good" value={good} />
                    <StatisticLine text="Neutral" value={neutral} />
                    <StatisticLine text="Bad" value={bad} />
                    <StatisticLine text="All" value={all} />
                    <StatisticLine
                        text="Average"
                        value={average ? average.toFixed(2) : 0}
                    />
                    <StatisticLine
                        text="Positive"
                        value={`${positive ? positive.toFixed(2) : '0.00'}%`}
                    />
                </div>
            ) : (
                <div className="statistics">
                    <p>No feedback given</p>
                </div>
            )}
        </>
    )
}

function App() {
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
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
