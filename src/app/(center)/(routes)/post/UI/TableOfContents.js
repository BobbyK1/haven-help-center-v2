'use client'

import { Selected, Unselected } from "@/app/UI/icons";
import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TableOfContents({ post }) {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const fromTop = window.scrollY;
            const headings = document.querySelectorAll("h2[id]");

            headings.forEach((heading) => {
                const section = document.getElementById(heading.id);
                if (
                    section.offsetTop <= fromTop + 100 &&
                    section.offsetTop + section.offsetHeight > fromTop + 100
                ) {
                    setActiveId(heading.id);
                }
            });
        };

        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = (id) => {
        setActiveId(id)
    }

    return (
        <Box p="3" position={["relative", "", "", "sticky"]} top="5" h="fit-content" minW="xs" bgColor="white" borderColor="blackAlpha.300" shadow="md">
            <Text fontSize="lg" mb="2" fontWeight="semibold">Sections</Text>
            <SimpleGrid columns="3" gap="2">
                {post.fields.postBody.content.map((item) => {
                    if (item.nodeType === "heading-2") {
                        const id = item.content[0].value.toString().replace(/\s/g, "-").toLowerCase();
                        return (
                            <Stack key={id} as={Link} p="1" px="4" bgColor={activeId === id ? "blue.400" : "white"} _hover={{ textDecor: "underline" }} transition="0.2s ease" borderRadius="5" direction="row" alignItems="center" spacing="4" href={`#${id}`} onClick={() => handleClick(id)}>
                                {/* {activeId === id ? <Selected fontSize="12" color="white" /> : <Unselected fontSize="12" color="blue.400" />} */}
                                <Text color={activeId === id ? "white" : "blue.400"} fontWeight="semibold" fontSize="sm" >{item.content[0].value}</Text>
                            </Stack>
                        );
                    } else {
                        return null;
                    }
                })}
            </SimpleGrid>
        </Box>
    );
}
