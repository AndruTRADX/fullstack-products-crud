import { useState } from 'react'

export interface Alert {
  active?: boolean; 
  message: string; 
  autoClose?: boolean; 
  type?: string;
}

export const useAlert = (options?: Alert) => {
  const defaultOptions = {
    active: false,
    message: '',
    type: '',
    autoClose: true,
  }

  const [alert, setAlert] = useState<Alert>({
    ...defaultOptions,
    ...options,
  })

  const toggleAlert = () => {
    setAlert({
      ...defaultOptions,
      ...options,
      active: !(alert.active)
    })
  }

  return {
    alert,
    setAlert,
    toggleAlert
  }
}