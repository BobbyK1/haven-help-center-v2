'use client'

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from "../utils/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const auth = getAuth(app);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setLoading(true);

            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }

            setLoading(false);
        })

        return () => unsub();
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}