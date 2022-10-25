import { useState } from 'react'

const History = ({ allClicks }) => {
    if (allClicks.length === 0) {
        return <div>the app is used by pressing the buttons</div>
    }
    return <div>button press history: {allClicks.join(' ')}</div>
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Clicks = ({ clicks }) => {
    return <strong> {clicks} </strong>
}

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    const handleClearClick = () => {
        setAll([])
        setLeft(0)
        setRight(0)
    }

    return (
        <div>
            <Clicks clicks={left} />
            <Button handleClick={handleLeftClick} text="left" />
            <Button handleClick={handleClearClick} text="clear" />
            <Button handleClick={handleRightClick} text="right" />
            <Clicks clicks={right} />
            <History allClicks={allClicks} />
        </div>
    )
}

export default App
