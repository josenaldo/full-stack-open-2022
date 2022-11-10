import './Notification.css'

const NOTIFICATION_LEVELS = {
    success: 'success',
    error: 'error',
    info: 'info',
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return <div className={` alert ${message.level}`}>{message.text}</div>
}

export { Notification, NOTIFICATION_LEVELS }
