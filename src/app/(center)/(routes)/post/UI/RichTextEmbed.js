'use client'

import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Box, Text } from "@chakra-ui/react";

export default function RichTextEmbed({ page }) {
    const Bold = ({ children }) => <Text fontWeight="bold">{children}</Text>;

    const TextBlock = ({ children }) => (
        <Box>{children}</Box>
    );

    const ListItem = ({ children }) => (
        <ol>
            <Text as="span" fontWeight="semibold">{children}</Text>
        </ol>
    );
      
    const OrderedListItem = ({ children }) => (
        <Text as="li" mt="10" mb="5" fontWeight="semibold">
            {children}
        </Text>
    );

    const options = {
        renderMark: {
        [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
        },
        renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => <TextBlock>{children}</TextBlock>,
        [BLOCKS.OL_LIST]: (node, children) => <ListItem>{children}</ListItem>,
        [BLOCKS.LIST_ITEM]: (node, children) => <OrderedListItem>{children}</OrderedListItem>
        },
        renderText: (text) => text,
    };

    return documentToReactComponents(page, options);
}
