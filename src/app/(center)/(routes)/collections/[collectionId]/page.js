import { ChevronRight } from "@/app/(center)/UI/icons";
import client from "@/app/utils/contentful";
import { Box, Container, Flex, SimpleGrid, Stack, Tag, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
	title: "Haven Help Center"
}

export default async function Page({ params }) {
    const id = await params.collectionId;

    async function GetEntries() {
        const entries = await client.getEntries({
            content_type: id
        })
            .then(entries => {return entries})
            .catch(error => console.log(error));

        return entries
    }

    const entries = await GetEntries();

    if (entries.items.length > 0) {


        async function GetCollection() {
            const collection = await client.getContentType(entries.items[0].sys.contentType.sys.id)
                .then(data => {
                    return { name: data.name, slug: data.sys.id};
                })
    
            return collection;
        }
    
        var collection = await GetCollection();
    }

    return (
        <>
            <Container maxW="7xl" mt="10">
                {entries.items.length > 0 &&
                <Suspense fallback="Loading collections...">
                    <Stack wrap="wrap" direction="row" spacing="2" mb="10">
                        <Stack direction="row" spacing="2" alignItems="center">
                            <Link href="/collections">
                                <Text fontSize="sm">All Collections</Text>
                            </Link>

                            <ChevronRight fontSize="sm" />
                        </Stack>

                        <Stack direction="row" spacing="2" alignItems="center">
                            <Link href={`/collections/${collection.slug}`}>
                                <Text fontSize="sm">{collection.name}</Text>
                            </Link>
                        </Stack>
                    </Stack>
                    <SimpleGrid columns={["1", "2", "3"]} gap="5">
                        <>
                            {entries.items.map(entry => {
                                return (
                                    <Link key={entry.sys.id} href={`/post/${entry.sys.id}`}>
                                        <Flex flexDir="column" justifyContent="center" _hover={{ shadow: "md" }} transition="0.2s ease" p="5" h="32" w="full" bg="blackAlpha.100" borderRadius="5">
                                            <Tag mb="2" w="fit-content" variant="subtle" colorScheme="blue">{entry.fields.mediaType}</Tag>
                                            <Text noOfLines="1" fontWeight="semibold">{entry.fields.title}</Text>
                                        </Flex>
                                    </Link>
                                )
                            })}
                        </>
                    </SimpleGrid>
                </Suspense>}
            </Container>
        </>
    )
}

