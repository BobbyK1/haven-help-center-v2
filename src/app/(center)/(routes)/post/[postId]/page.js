import client from "@/app/utils/contentful";
import { Suspense } from "react";
import YoutubeEmbed from "../UI/YoutubeEmbed";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, Stack, Text } from "@chakra-ui/react";
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