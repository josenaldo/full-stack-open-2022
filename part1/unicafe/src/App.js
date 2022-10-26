import { useState } from 'react'

import './App.css'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
    return (
        <tr className="stat">
            <th>{text}</th>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = (good / all) * 100

    return (
        <>
            {all > 0 ? (
                <table className="statistics">
                    <tbody>
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
                            value={`${
                                positive ? positive.toFixed(2) : '0.00'
                            }%`}
                        />
                    </tbody>
                </table>
            ) : (
                <div className="statistics">
                    <p>No feedback given</p>
                </div>
            )}
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div className="app">
            <Title text="Give feedback" />
            <div className="feedback">
                <Button handleClick={handleGoodClick} text="Good" />
                <Button handleClick={handleNeutralClick} text="Neutral" />
                <Button handleClick={handleBadClick} text="Bad" />
            </div>

            <Title text="Statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
