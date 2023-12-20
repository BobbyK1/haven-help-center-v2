'use client'

import app from "@/app/utils/firebase";
import { Alert, AlertIcon, Button, Input, Stack, Text, useToast } from "@chakra-ui/react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const toast = useToast();

    const auth = getAuth(app);

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/collections');
                router.refresh();
            })
            .catch(error => {
                setError(error)
            })

        setLoading(false);
    }

    return (
        <form>
            {error && <Alert mb="4" borderRadius="3" status="error" variant="left-accent"><AlertIcon /> Incorrect email or password</Alert>}
            <Text fontSize="md" mb="2" fontWeight="medium">Email</Text>
            <Input type="email" onChange={(e) => setEmail(e.currentTarget.value)} placeholder="example@domain.com" required borderColor="blackAlpha.300" name="email" />

            <Text fontSize="md" mt="5" mb="2" fontWeight="medium">Password</Text>
            <Input type="password" onChange={(e) => setPassword(e.currentTarget.value)} required borderColor="blackAlpha.300" name="password" />

            <Stack direction="row" mt="5" justify="space-between" alignItems="center">
                <Link href="/forgot-password">
                    <Text _hover={{ textDecor: "underline" }} color="blue.500">Forgot Password?</Text>
                </Link>

                <Button onClick={handleLogin} isLoading={loading} isDisabled={email.length === 0 || password.length === 0} variant="solid" size="sm">Sign In</Button>
            </Stack>
        </form>
    )
}