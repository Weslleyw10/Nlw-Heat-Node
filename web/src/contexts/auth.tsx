import { createContext, ReactNode, useEffect, useState } from 'react'
import { rest } from '../services/rest'


type AuthProvider = {
    children: ReactNode
}

type User = {
    id: string,
    avatar_url: string,
    name: string,
    login: string
}

type AuthResponse = {
    jwtoken: string;
    user: User;
}

type AuthContextData = {
    signInUrl: string;
    user: User | null;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProvider) {
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=052c7cdf6f5b6a0a2c8b`

    const [user, setUser] = useState<User | null>(null)

    async function signIn(gitHubCode: string) {
        const response = await rest.post<AuthResponse>('/authentication', {
            code: gitHubCode
        })

        const { jwtoken, user } = response.data
        localStorage.setItem('@heatnode:auth-token', jwtoken)
        setUser(user)
    }


    async function getUserProfile(token: string) {
        rest.defaults.headers.common.authorization = `Bearer ${token}`
        const { data: user } = await rest.get<User>("/profile")
        setUser(user)
    }

    function signOut() {
        localStorage.removeItem('@heatnode:auth-token')
        setUser(null)
    }

    useEffect(() => {
        const token = localStorage.getItem('@heatnode:auth-token')
        if(token) {
            getUserProfile(token)            
        }

    }, [])

    useEffect(() => {
        const url = window.location.href
        const hasGithubCode = url.includes('?code=')

        if (hasGithubCode) {
            const [urlWithOutCode, code] = url.split('?code=')
            console.log({ code })
            window.history.pushState({}, '', urlWithOutCode)

            signIn(code)
        }
    }, [])


    return (
        <AuthContext.Provider value={{signInUrl, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    )

}
