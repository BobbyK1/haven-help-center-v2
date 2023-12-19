import client from "@/app/utils/contentful";
import { Suspense } from "react";
import YoutubeEmbed from "../UI/YoutubeEmbed";
import { Container, Heading } from "@chakra-ui/react";
import GoogleSlideEmbed from "../UI/GoogleSlideEmbed";
import RichTextEmbed from "../UI/RichTextEmbed";

export default async function Page({ params }) {
    const id = params.postId;

    const extractVideoId = (url) => {
        const match = url.match(/v=([a-zA-Z0-9_-]+)/);
        if (match) {
          return match[1];
        }
        return null;
    }

    async function Post() {
        const post = await client.getEntry(id)
            .then(entry => {return entry})

        switch (post.fields.mediaType) {
            case "Video":
                return (
                    <>
                        <Heading fontSize={["2xl", "3xl"]} mb="10">{post.fields.title}</Heading>
                        <YoutubeEmbed videoId={extractVideoId(post.fields.videoLink)} height="400" />
                    </>
                )
                break;
            
            case "PDF":
                return <PdfEmbed link={post.fields.videoLink} />
                break;

            case "Image":
                return (
                    <>
                        <Heading mb="10">{post.fields.title}</Heading>
                        <ImageEmbed link={post.fields.videoLink} />
                    </>
                )
                break;

            case "Google Slide":
                return ( 
                    <>
                        <Heading mb="10">{post.fields.title}</Heading>
                        <GoogleSlideEmbed link={post.fields.videoLink} />
                    </>
                )
                break;
        
            case "Blog": 
                return (
                    <>
                        <Heading mb="10">{post.fields.title}</Heading>
                        <RichTextEmbed page={post.fields.postBody} />
                    </>
                )
                break;
            default:
                break;
        }
    }
    return (
        <Container maxW="5xl" pb="20" my="10">
            <Suspense fallback="Loading...">
                <Post />
            </Suspense>
        </Container>
        
    )
}