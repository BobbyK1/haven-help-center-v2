'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from "../utils/firebase";
import { Flex, Spinner } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setLoading(true);

            if (user) {
                setUser(user);
            } else {
                setUser(null);
                router.push(`/`)
            }

            setLoading(false);
        })

        return () => unsub();
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {
                loading  ?
                <Flex w="full" h="50vh" justifyContent="center" alignItems="center">
                    <Spinner />
                </Flex>
                :
                children
            }
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}