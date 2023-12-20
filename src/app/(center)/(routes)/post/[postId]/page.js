import client from "@/app/utils/contentful";
import { Suspense } from "react";
import YoutubeEmbed from "../UI/YoutubeEmbed";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Container, Heading } from "@chakra-ui/react";
import GoogleSlideEmbed from "../UI/GoogleSlideEmbed";
import RichTextEmbed from "../UI/RichTextEmbed";
import Link from "next/link";
import { ChevronRight } from "@/app/(center)/UI/icons";

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

        // switch (post.fields.mediaType) {
        //     case "Video":
        //         return (
        //             <>
        //                 <Heading fontSize={["2xl", "3xl"]} mb="10">{post.fields.title}</Heading>
        //                 <YoutubeEmbed videoId={extractVideoId(post.fields.videoLink)} height="400" />
        //             </>
        //         )
        //         break;
            
        //     case "PDF":
        //         return <PdfEmbed link={post.fields.videoLink} />
        //         break;

        //     case "Image":
        //         return (
        //             <>
        //                 <Heading mb="10">{post.fields.title}</Heading>
        //                 <ImageEmbed link={post.fields.videoLink} />
        //             </>
        //         )
        //         break;

        //     case "Google Slide":
        //         return ( 
        //             <>
        //                 <Heading mb="10">{post.fields.title}</Heading>
        //                 <GoogleSlideEmbed link={post.fields.videoLink} />
        //             </>
        //         )
        //         break;
        
        //     case "Blog": 
        //         return (
        //             <>
        //                 <Heading mb="10">{post.fields.title}</Heading>
        //                 <RichTextEmbed page={post.fields.postBody} />
        //             </>
        //         )
        //         break;
        //     default:
        //         break;
        // }
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
        <Container maxW="container.sm" pb="20" my="10">
            <Breadcrumb mb="10" fontSize={["xs", "xs", "sm"]}  separator={<ChevronRight fontSize="xs" />}>
                <BreadcrumbItem>
                    <BreadcrumbLink fontSize={["xs", "xs", "sm"]} as={Link} href="/collections">All Collections</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink fontSize={["xs", "xs", "sm"]} as={Link} href={`/collections/${collection.slug}`}>{collection.name}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink isCurrentPage={true} fontSize={["xs", "xs", "sm"]}>{post.fields.title}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Suspense fallback="Loading...">
                <Heading mb="10">{post.fields.title}</Heading>

                {mediaType === "Blog" && <RichTextEmbed page={post.fields.postBody} />}
                {mediaType === "Video" && <YoutubeEmbed videoId={extractVideoId(post.fields.videoLink)} />}
                {mediaType === "Google Slide" && <GoogleSlideEmbed link={post.fields.videoLink} />}
            </Suspense>
        </Container>
        
    )
}