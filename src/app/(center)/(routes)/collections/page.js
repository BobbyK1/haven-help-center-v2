import client from "@/app/utils/contentful";
import { Box, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
	title: "Haven Help Center"
}

export default async function Page() {

    async function Collections() {
        const types = await client.getContentTypes()
            .then(types => {
                return types
            })
            .catch(error => console.log(error))

        return types.items.map(type => {
            return (
                <Link key={type.sys.id} href={`/collections/${type.sys.id}`}>
                    <Flex _hover={{ shadow: "md" }} transition="0.2s ease" justifyContent="center" alignItems="center" p="5" h="32" w="full" bg="blackAlpha.100" borderRadius="5">
                        <Text fontWeight="semibold">{type.name}</Text>
                    </Flex>
                </Link>
            )
        })
    }

    return (
        <>
            <Container maxW="7xl" mt="10">
                <Suspense fallback="Loading collections...">
                    <SimpleGrid columns={["1", "2", "3"]} gap="5">
                        <Collections />
                    </SimpleGrid>
                </Suspense>
            </Container>
        </>
    )
}