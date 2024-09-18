export const getUsername = () => {
    return JSON.parse(localStorage.getItem('user')).username
}