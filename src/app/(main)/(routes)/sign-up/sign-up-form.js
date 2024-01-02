'use client'

import app, { db } from "@/app/utils/firebase";
import { Alert, AlertIcon, Button, Input, Stack, Text } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignUpForm() {
    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();

    const signUp = async () => {
        setLoading(true);
        setError(false);

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async data => {
                await setDoc(doc(db, 'users', data.user.uid), {
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                })
                .then(data => {
                    return router.push('/collections')
                })
                .catch(error => console.log(error))
            })
            .catch(error => {
                switch (error.code) {
                    case "auth/weak-password":
                        setError("Weak password entered. Password must be at least 6 characters");
                        break;
                    case "auth/email-already-in-use":
                        setError("Email is already in use");
                        break;
                    case "auth/invalid-email":
                        setError("Invalid email");
                        break;
                    default:
                        setError("Unknown error occured");
                  }
            })

        setLoading(false);
    }
    return (
        <form>
            {error && <Alert mb="4" borderRadius="3" status="error" variant="left-accent"><AlertIcon /> {error}</Alert>}

            <Text fontSize="md" mb="2" fontWeight="medium">Email</Text>
            <Input type="email" onChange={(e) => setEmail(e.currentTarget.value)} placeholder="example@domain.com" required borderColor="blackAlpha.300" name="email" />

            <Text fontSize="md" mt="4" mb="2" fontWeight="medium">Password</Text>
            <Input type="password" onChange={(e) => setPassword(e.currentTarget.value)} required borderColor="blackAlpha.300" name="password" />

            <Text fontSize="md" mt="4" mb="2" fontWeight="medium">First name</Text>
            <Input type="text" onChange={(e) => setFirstName(e.currentTarget.value)} placeholder="John" required borderColor="blackAlpha.300" name="first name" />

            <Text fontSize="md" mt="4" mb="2" fontWeight="medium">Last name</Text>
            <Input type="text" onChange={(e) => setLastName(e.currentTarget.value)} placeholder="Doe" required borderColor="blackAlpha.300" name="last name" />

            <Stack direction="row" mt="5" justify="space-between" alignItems="center">
                <Link href="/">
                    <Text _hover={{ textDecor: "underline" }} color="blue.500">Back to sign in</Text>
                </Link>

                <Button onClick={signUp} isLoading={loading} isDisabled={email.length === 0 || password.length === 0 || firstName.length === 0 || lastName === 0 || loading} variant="solid" size="sm">Sign Up</Button>
            </Stack>
        </form>
    )
}