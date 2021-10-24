import { FormEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { rest } from '../../services/rest';
import styles from './styles.module.scss';

export function SendMessageForm() {
    const { user, signOut } = useContext(AuthContext)
    const [message, setMessage] = useState('')

    async function handleSendMessage(event: FormEvent) {
        event.preventDefault()

        if(!message.trim()) {
            return
        }

        await rest.post('/messages', { message })

        setMessage('')

    }


    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted />
                    { user?.login }
                </span>
            </header>

            <form className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                    onChange={e => setMessage(e.target.value)}
                    name="message"
                    id="message"
                    value={message}
                    placeholder="Qual sua expectativa para o evento?"
                />

                <button onClick={event => handleSendMessage(event)} type="submit">Enviar mensagem</button>
            </form>

        </div>
    )
}