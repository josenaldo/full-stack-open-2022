import React from 'react'
import PropTypes from 'prop-types'

const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'Make not important' : 'Make important'

    return (
        <li>
            {note.content} <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

Note.propTypes = {
    note: PropTypes.shape({
        content: PropTypes.string.isRequired,
        important: PropTypes.bool.isRequired,
    }).isRequired,
    toggleImportance: PropTypes.func.isRequired,
}

export default Note
