import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { rest } from '../../services/rest';

import styles from './styles.module.scss';
import logo from '../../assets/logo.svg'

type IMessages = {
    id: string,
    text: string,
    user: {
        id: string,
        name: string,
        avatar_url: string
    }
}

const messagesQueue: IMessages[] = []

const socket = io('http://localhost:8000')
socket.on('new_message', newMessage => {
    messagesQueue.push(newMessage)
})

export function MessageList() {
    const [messages, setMessages] = useState<IMessages[]>([])

    useEffect(() => {
        const scheduler = setInterval(() => {
            if(messagesQueue.length > 0) {
                setMessages(prevState => [
                    messagesQueue[0],
                    messages[1],
                    messages[2]
                ].filter(Boolean))

                messagesQueue.shift()
            }
        }, 3000)
    }, [])

    useEffect(() => {
        rest.get<IMessages[]>('/messages/last3').then(response => setMessages(response.data))
    })

    return (
        <div className={styles.messageBoxWrapper}>
            <img src={logo} alt="Heat Node" />

            <ul className={styles.messageList}>
                { messages.map(message => (
                    <li key={message.id} className={styles.messageContainer}>
                        <p className={styles.messageContent}>{message.text}</p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src="https://github.com/weslleyw10.png" alt={message.user.name} />
                            </div>
                            <span>{message.user.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}