'use client'

import { Selected, Unselected } from "@/app/UI/icons";
import { Box, Stack, Text } from "@chakra-ui/react";
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
        <Box position={["relative", "", "", "sticky"]} top="5" h="fit-content" minW="sm" bgColor="white" borderColor="blackAlpha.300" shadow="lg">
            <Box p="2" bgColor="gray.700" color="whitesmoke" borderTopRadius="5" borderBottomLeftRadius="-62">
            </Box>

            <Box p="5">
                {post.fields.postBody.content.map((item) => {
                    if (item.nodeType === "heading-2") {
                        const id = item.content[0].value.toString().replace(/\s/g, "-").toLowerCase();
                        return (
                            <Stack key={id} p="1" px="4" bgColor={activeId === id ? "blue.400" : "white"} borderRadius="5" direction="row" alignItems="center" spacing="4">
                                {activeId === id ? <Selected fontSize="12" color="white" /> : <Unselected fontSize="12" color="blue.400" />}
                                <Text  _hover={{ textDecor: "underline" }} as={Link} color={activeId === id ? "white" : "blue.400"} fontWeight="semibold" fontSize="sm" href={`#${id}`} onClick={() => handleClick(id)}>{item.content[0].value}</Text>
                            </Stack>
                        );
                    } else {
                        return null;
                    }
                })}
            </Box>
        </Box>
    );
}
