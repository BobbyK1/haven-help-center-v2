import { Box, Button, Container, Heading, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import SignInForm from "./UI/sign-in-form";

export const metadata = {
	title: "Haven Help Center"
}


export default function Home() {
	return (
		<Container maxW="container.sm">
			<Box mt="20" w="fit-content" p="5" borderRadius="5" borderColor="blackAlpha.200" borderWidth="thin" minW="sm" mx="auto" maxW="md">
				<Heading mb="10" as="h2" fontSize="xl">Help Center Sign In</Heading>
				<Box maxW="md">
					<SignInForm />
				</Box>
			</Box>
		</Container>
	)
}
