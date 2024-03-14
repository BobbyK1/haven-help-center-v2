import client from "@/app/utils/contentful";
import { Suspense } from "react";
import YoutubeEmbed from "../UI/YoutubeEmbed";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import GoogleSlideEmbed from "../UI/GoogleSlideEmbed";
import RichTextEmbed from "../UI/RichTextEmbed";
import Link from "next/link";
import { ChevronRight } from "@/app/(center)/UI/icons";
import PdfEmbed from "../UI/PdfEmbed";

export const metadata = {
	title: "Haven Help Center"
}

export default async function Page({ params }) {
    const id = params.postId;

    const extractVideoId = (url) => {
        const match = url.match(/v=([a-zA-Z0-9_-]+)/);
        if (match) {
          return match[1];
        }
        return null;
    }

    async function GetPost() {
        const post = await client.getEntry(id)
            .then(entry => {return entry})

        return post;
    }

    const post = await GetPost();
    const mediaType = post.fields.mediaType;

    async function GetCollection() {
        const collection = await client.getContentType(post.sys.contentType.sys.id)
            .then(data => {
                return { name: data.name, slug: data.sys.id};
            })

        return collection;
    }

    const collection = await GetCollection();

    return (
        <Container maxW="7xl" mt="10">
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

                    <ChevronRight fontSize="sm" />
                </Stack>

                <Stack direction="row" spacing="2" alignItems="center">
                    <Text color="blackAlpha.600" fontSize="sm">{post.fields.title}</Text>
                </Stack>
            </Stack>

            <Container maxW="container.xl" pb="20" my="10">
            
                <Suspense fallback="Loading...">
                    <Heading mb="10">{post.fields.title}</Heading>

                    {post.fields.videoLink && mediaType === "Video" ? <YoutubeEmbed videoId={extractVideoId(post.fields.videoLink)} /> : null}

                    {post.fields.prevVideoLink || post.fields.nextVideoLink ?
                        <>
                            <Text fontSize="lg"  fontWeight="bold">Check Out What's Next</Text>
                            <Divider mb="5" mt="3" borderColor="blackAlpha.500" />
                        </> 
                     : null}

                    <Stack direction="row" mb={post.fields.prevVideoLink || post.fields.nextVideoLink ? "20" : "0"}>
                        {post.fields.prevVideoLink && 
                            <Box borderWidth="thin" borderRadius="10" borderColor="blackAlpha.300" pb="0" as={Link} href={`${post.fields.prevVideoLink}`} w="full">
                                <Stack role="group" direction="row" justify="space-between" alignItems="center"  _hover={{ bgColor: "blue.50" }} transition="0.2s ease" p="5" borderRadius="10">
                                    <Box>
                                        <Text fontSize="sm" fontWeight="semibold"><Text as="span" fontSize="sm" mr="5">Previous:</Text> {post.fields.prevVideoTitle}</Text>
                                    </Box> 

                                    <Flex 
                                        transition={'all .3s ease'}
                                        transform={'translateX(-10px)'}
                                        opacity={0}
                                        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                                        justify={'flex-end'}
                                        align={'center'}
                                        flex={1}>
                                        <ChevronRight />
                                    </Flex>
                                </Stack>
                            </Box>
                        }

                        {post.fields.nextVideoLink && 
                            <Box borderWidth="thin" borderRadius="10" borderColor="blackAlpha.300" pb="0" as={Link} href={`${post.fields.nextVideoLink}`} w="full">
                                <Stack role="group" direction="row" borderRadius="10" justify="space-between" alignItems="center"  _hover={{ bgColor: "blue.50" }} transition="0.2s ease" p="5" >
                                    <Box>
                                        <Text fontSize="sm" fontWeight="semibold"><Text as="span" fontSize="sm" mr="5">Next Up:</Text> {post.fields.nextVideoTitle}</Text>
                                    </Box> 

                                    <Flex 
                                        transition={'all .3s ease'}
                                        transform={'translateX(-10px)'}
                                        opacity={0}
                                        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                                        justify={'flex-end'}
                                        align={'center'}
                                        flex={1}>
                                        <ChevronRight />
                                    </Flex>
                                </Stack>
                            </Box>
                        }
                    </Stack>

                    {post.fields.videoLink && mediaType === "Google Slide" ? <GoogleSlideEmbed link={post.fields.videoLink} /> : null}

                    {post.fields.videoLink && mediaType === "PDF" ? <PdfEmbed embedLink={post.fields.videoLink} /> : null}

                    {post.fields.postBody ? <RichTextEmbed page={post.fields.postBody} /> : null}

                    

                    {/* {mediaType === "Blog" && <RichTextEmbed page={post.fields.postBody} />}
                    {mediaType === "Video" && <YoutubeEmbed videoId={extractVideoId(post.fields.videoLink)} />}
                    {mediaType === "Google Slide" && <GoogleSlideEmbed link={post.fields.videoLink} />}
                    {mediaType === "PDF" && <PdfEmbed embedLink={post.fields.videoLink} />} */}
                </Suspense>
            </Container>
        </Container> 
    )
}