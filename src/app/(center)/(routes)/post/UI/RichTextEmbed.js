import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Box, Text, Heading } from "@chakra-ui/react";
import Link from 'next/link';
import Image from 'next/image';

export default function RichTextEmbed({ page }) {
    const Bold = ({ children }) => <Text as="span" fontWeight="bold">{children}</Text>;

    const TextBlock = ({ children }) => (
        <Box mb="4">{children}</Box>
    );

    const HeadingBlock = ({ level, children }) => {
        const str = children.toString();
        const idLink = str.replace(/\s/g, "-").toLowerCase();
        
        return (
            <Heading id={idLink} as={`h${level}`} fontSize={level === 1 ? "2xl" : level === 2 ? "xl" : "lg"} mt="10" mb="10">
                {children}
            </Heading>
        );
    };
    

    const ListItem = ({ children }) => (
        <Box as="li" mt="2" mb="2" pl="4" fontWeight="semibold">
            {children}
        </Box>
    );

    const OrderedListItem = ({ children }) => (
        <ListItem>
            <ol>{children}</ol>
        </ListItem>
    );

    const Blockquote = ({ children }) => (
        <Box borderLeftWidth="5px" borderRadius="4" borderColor="blackAlpha.300" pl="4" fontStyle="italic" my="4">
            {children}
        </Box>
    );

    const options = {
        renderMark: {
            [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <TextBlock>{children}</TextBlock>,
            [BLOCKS.HEADING_1]: (node, children) => <HeadingBlock level={1} id={children.replace(/\s/g, "-")}>{children}</HeadingBlock>,
            [BLOCKS.HEADING_2]: (node, children) => <HeadingBlock level={2}>{children}</HeadingBlock>,
            [BLOCKS.HEADING_3]: (node, children) => <HeadingBlock level={3}>{children}</HeadingBlock>,
            [BLOCKS.OL_LIST]: (node, children) => <Box as="ol" pl="4" mb="4">{children}</Box>,
            [BLOCKS.UL_LIST]: (node, children) => <Box as="ul" pl="4" ml="6" mb="4">{children}</Box>,
            [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
            [BLOCKS.HR]: () => <Box borderBottom="0.5px solid gray" my="4" />,
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                return (
                    <Box>
                        {node.data.target.fields.file.url ? <Image src={`https:${node.data.target.fields.file.url}`} height={node.data.target.fields.file.details.image.height} width={node.data.target.fields.file.details.image.width} style={{ marginTop: "4em", marginBottom: "4em", aspectRatio: "16 / 8" }} /> : null}
                    </Box>
                );
            },
            [INLINES.HYPERLINK]: (node, children) => {
                return <Text color="blue.500" _hover={{ textDecoration: "underline" }} as={Link} href={node.data.uri} target="_blank">{children}</Text>;
            },
            [BLOCKS.QUOTE]: (node, children) => <Blockquote>{children}</Blockquote>,
        },
        renderText: (text) => text,
    };

    return documentToReactComponents(page, options);
}
