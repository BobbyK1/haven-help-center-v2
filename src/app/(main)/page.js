'use client'

import { Box, Container, Heading } from "@chakra-ui/react";
import SignInForm from "./UI/sign-in-form";
import { AuthContextProvider } from "../context/AuthContext";


export default function Home() {
	return (
		<Container maxW="container.sm">
			<Box mt="20" w="fit-content" p="5" borderRadius="5" borderColor="blackAlpha.200" borderWidth="thin" minW="sm" mx="auto" maxW="md">
				<Heading mb="10" as="h2" fontSize="xl">Help Center Sign In</Heading>
				<Box maxW="md">
					<AuthContextProvider>
						<SignInForm />
					</AuthContextProvider>
				</Box>
			</Box>
		</Container>
	)
}
