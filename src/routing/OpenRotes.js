import { Navigate } from "react-router-dom";

export const openRotes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"))
    return getTokenFromLocalStorage?.token === undefined ? children : (<Navigate to="/" replace={true} />)
}