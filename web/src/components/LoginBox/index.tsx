import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { VscGithubInverted } from 'react-icons/vsc'

import styles from './styles.module.scss';


export function LoginBox() {
    const { signInUrl, user, signOut } = useContext(AuthContext)

    console.log({ user }, "LoginBox")
     
    return (
        <div className={styles.loginBoxWrapper}>
            <h2>Entre e compartilhe sua mensagem</h2>
            <a href={signInUrl} className={styles.signWithGithub}>
                <VscGithubInverted />
                Entrar com Github
            </a>
        </div>
    )
}