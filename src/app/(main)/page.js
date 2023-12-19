import { Box, Button, Container, Heading, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";


export default function Home() {
	return (
		<Container maxW="container.sm">
			<Box mt="20" w="fit-content" p="5" borderRadius="5" borderColor="blackAlpha.200" borderWidth="thin" minW="sm" mx="auto" maxW="md">
				<Heading mb="10" as="h2" fontSize="xl">Help Center Sign In</Heading>
				<Box maxW="md">
					<form>
						<Text fontSize="md" mb="2" fontWeight="medium">Email</Text>
						<Input type="email" placeholder="example@domain.com" required borderColor="blackAlpha.300" name="email" />

						<Text fontSize="md" mt="5" mb="2" fontWeight="medium">Password</Text>
						<Input type="password" required borderColor="blackAlpha.300" name="password" />

						<Stack direction="row" mt="5" justify="space-between" alignItems="center">
							<Link href="/forgot-password">
								<Text _hover={{ textDecor: "underline" }} color="blue.500">Forgot Password?</Text>
							</Link>

							<Button variant="solid" size="sm">Sign In</Button>
						</Stack>
					</form>
				</Box>
			</Box>
		</Container>
	)
}
