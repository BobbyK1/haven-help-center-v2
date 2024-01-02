import { Box, Container, Heading } from "@chakra-ui/react";
import SignUpForm from "./sign-up-form.js";


export default function Page() {
    return (
        <Container maxW="container.sm">
			<Box mt="20" w="fit-content" p="5" borderRadius="5" borderColor="blackAlpha.200" borderWidth="thin" minW="sm" mx="auto" maxW="md">
				<Heading mb="10" as="h2" fontSize="xl">Sign up</Heading>
				<Box maxW="md">
					<SignUpForm />
				</Box>
			</Box>
		</Container>
    )
}