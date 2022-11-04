import { json } from "react-router-dom"

export const getUsername = () => {
    return JSON.parse(localStorage.getItem('user')).username
}