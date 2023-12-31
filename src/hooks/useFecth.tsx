import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = (endpoint: string) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const response = await axios.get(endpoint)
    setData(response.data)
  } 

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [endpoint])

  return data
}
