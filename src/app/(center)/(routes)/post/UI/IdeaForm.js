'use client'

import { SendIdeaToEmail } from "@/app/actions";
import { Check } from "@/app/UI/icons";
import { Alert, AlertIcon, Box, Button, Center, Container, Heading, Input, SimpleGrid, Stack, Text, Textarea } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus, useFormState } from 'react-dom';

const initialState = {
    message: null
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return <Button type="submit" borderRadius="none" mt="10" w="full" isDisabled={pending} isLoading={pending}>Submit</Button>
}

export default function IdeaForm() {
    const [state, formAction] = useFormState(SendIdeaToEmail, initialState);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (state.message === "success") {
            return setSuccess(true);
        } else if (state.message === "No data provided.") {
            setError('Please fill out required fields!')
        }
    }, [state])

    return (
        <>
            <Box px={[5, 5, 5, 20]} py="14" w="full" bgColor="gray.800" color="whitesmoke">
                <Container maxW="7xl">
                    <SimpleGrid columns={[1, 1, 1, 2]} gap="10">
                        <Box>
                            <Heading lineHeight="1.5" as="h2">Want Us To Add A <br /> Specific Topic?</Heading>
                            
                            <Text mt="10" fontWeight="thin">If you notice something we don't have added the help center, <br /> please fill out the form and let us know.</Text>
                        </Box>

                        <Box>
                            {success ? 
                                <>
                                    <Center flexDir="column" minH="96">
                                        <Check fontSize="5xl" color="blue.400" />

                                        <Heading as="h3" textAlign="center" my="8">Topic Submitted!</Heading>

                                        <Button w="full" borderRadius="none" onClick={() => {
                                            setSuccess(false);
                                            setError('');
                                        }}>Submit Another Idea</Button>
                                    </Center>
                                </>
                                :
                                <form action={formAction}>
                                    {error && <Alert color="black" status="error" size="sm" mb="5"><AlertIcon /> {error}</Alert>}
                                    <Text fontSize="lg" mb="5" fontWeight="thin">Topic *</Text>
                                    <Input type="text" name="topic" required borderColor="white" variant="flushed" />

                                    <Text mt="8" mb="5" fontSize="lg" fontWeight="thin">Details</Text>
                                    <Textarea name="details" resize={false} h="52" />

                                    <SubmitButton />
                                </form>}
                        </Box>
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    )
}