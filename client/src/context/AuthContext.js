import { faL } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useReducer } from "react"
import { createContext, useContext } from "react"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: null,
    error: null
}

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "REGISTER_RESET":
            return {
                user: null,
                loading: false,
                error: null
            }
        case "REGISTER_START":
            return {
                user: null,
                loading: true,
                error: null
            }
        case "REGISTER_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case "REGISTER_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        case "VERIFICATION_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        if (state.user === null) {
            localStorage.removeItem("user")
        } else
      localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])
    
    return (
        <AuthContext.Provider value={{
            user: state.user,
            error: state.error,
            loading: state.loading,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}