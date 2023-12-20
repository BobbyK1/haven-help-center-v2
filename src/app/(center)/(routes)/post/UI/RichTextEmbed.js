import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Box, Text, Heading, Link } from "@chakra-ui/react";

export default function RichTextEmbed({ page }) {
    const Bold = ({ children }) => <Text fontWeight="bold">{children}</Text>;

    const TextBlock = ({ children }) => (
        <Box mb="4">{children}</Box>
    );

    const HeadingBlock = ({ level, children }) => {
        return (
            <Heading as={`h${level}`} fontSize={level === 1 ? "xl" : level === 2 ? "lg" : "md"} mt="6" mb="4">
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
            [BLOCKS.HEADING_1]: (node, children) => <HeadingBlock level={1}>{children}</HeadingBlock>,
            [BLOCKS.HEADING_2]: (node, children) => <HeadingBlock level={2}>{children}</HeadingBlock>,
            [BLOCKS.HEADING_3]: (node, children) => <HeadingBlock level={3}>{children}</HeadingBlock>,
            [BLOCKS.OL_LIST]: (node, children) => <Box as="ol" pl="4" mb="4">{children}</Box>,
            [BLOCKS.UL_LIST]: (node, children) => <Box as="ul" pl="4" mb="4">{children}</Box>,
            [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
            [BLOCKS.HR]: () => <Box borderBottom="0.5px solid gray" my="4" />,
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const { data } = node;
                return (
                    <Box>
                        <img src={data.target.fields.file.url} alt={data.target.fields.description} />
                    </Box>
                );
            },
            [BLOCKS.HYPERLINK]: (node, children) => {
                return <Link href={node.data.uri} target="_blank" rel="noopener noreferrer">{children}</Link>;
            },
            [BLOCKS.QUOTE]: (node, children) => <Blockquote>{children}</Blockquote>,
        },
        renderText: (text) => text,
    };

    return documentToReactComponents(page, options);
}
