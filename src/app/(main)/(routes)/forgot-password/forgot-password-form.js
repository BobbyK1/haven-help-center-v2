'use client'

import app from "@/app/utils/firebase";
import { Alert, AlertIcon, Button, Input, Stack, Text } from "@chakra-ui/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useState } from "react"

export default function ForgotpasswordForm() {
    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    const sendLink = async () => {
        setLoading(true);
        setError(false);
        setSent(false);

        await sendPasswordResetEmail(auth, email)
            .then(() => setSent(true))
            .catch(error => setError(true))

        setLoading(false);
    }
    return (
        <form>
            {sent && <Alert mb="4" borderRadius="3" status="success" variant="left-accent"><AlertIcon /> Password reset link sent to: {email}</Alert>}
            {error && <Alert mb="4" borderRadius="3" status="error" variant="left-accent"><AlertIcon /> Email does not exist</Alert>}

            <Text fontSize="md" mb="2" fontWeight="medium">Email</Text>
            <Input type="email" onChange={(e) => setEmail(e.currentTarget.value)} placeholder="example@domain.com" required borderColor="blackAlpha.300" name="email" />

            <Stack direction="row" mt="5" justify="space-between" alignItems="center">
                <Link href="/">
                    <Text _hover={{ textDecor: "underline" }} color="blue.500">Back to sign in</Text>
                </Link>

                <Button onClick={sendLink} isLoading={loading} isDisabled={email.length === 0 || loading} variant="solid" size="sm">Get Link</Button>
            </Stack>
        </form>
    )
}