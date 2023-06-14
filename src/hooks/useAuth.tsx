'use client'
import { useState, useContext, createContext } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'

import { endpoints } from '@/libs/endpoints.api'

interface User {
  email: string
  password: string
  name: string
  role: string, 
  avatar: string 
}

interface Props {
  children: JSX.Element
}

interface AppContextInterface {
  user: User | undefined
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, name: string) => Promise<any>
  signOut: () => Promise<any>
}

const AuthContext = createContext<AppContextInterface | undefined>(undefined)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const useAuthProvider = () => {
  const [user, setUser] = useState()

  const signIn = async (email: string, password: string) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    }
    const { data: access_token } = await axios.post(endpoints.auth.login, { email, password }, options)
    if (access_token) {
      const token = access_token.access_token
      Cookie.set('token', token, { expires: 10 })
      axios.defaults.headers.Authorization = `Bearer ${token}`
      const { data: user } = await axios.get(endpoints.auth.profile)
      setUser(user)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      endpoints.users.create, 
      { 
        email, 
        password, 
        name, 
        role: 'customer', 
        avatar: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' 
      }, 
      options,
    )
  }

  const signOut = async () => {
    Cookie.remove('token')
    setUser(undefined)
    delete axios.defaults.headers.Authorization
    window.location.href = '/'
  }

  return {
    user,
    signIn,
    signUp,
    signOut,
  }
  
}

export const ProviderAuth = (props: Props) => {
  const { children } = props
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>
    { children }
  </AuthContext.Provider>
}


