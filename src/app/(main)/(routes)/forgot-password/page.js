import { Box, Container, Heading } from "@chakra-ui/react";
import ForgotpasswordForm from "./forgot-password-form";


export default function Page() {
    return (
        <Container maxW="container.sm">
			<Box mt="20" w="fit-content" p="5" borderRadius="5" borderColor="blackAlpha.200" borderWidth="thin" minW="sm" mx="auto" maxW="md">
				<Heading mb="10" as="h2" fontSize="xl">Forgotten password reset</Heading>
				<Box maxW="md">
					<ForgotpasswordForm />
				</Box>
			</Box>
		</Container>
    )
}