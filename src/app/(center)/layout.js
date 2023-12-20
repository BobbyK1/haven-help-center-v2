'use client'

import { Box, Collapse, Container, Fade, Flex, Heading, Icon, Input, Portal, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronRight } from "./UI/icons";
import index from "../utils/algolia";
import { AuthContextProvider } from "../context/AuthContext";
import Navbar from "../UI/navbar";


export default function Layout({ children }) {
    const [results, setResults] = useState([]);
    const searchBar = useRef();

    const handleSearch = async (e) => {
        const currentSearch = e.currentTarget.value;

        if (currentSearch.length > 3) {
            await index.search(currentSearch)
                .then(({ hits }) => {
                    setResults(hits);
                })
        } else if (currentSearch.length < 3) {
            setResults([]);
        }
        
    }

    const handleClick = () => {
        searchBar.current.value = '';
        setResults([]);
    }

    return (
        <AuthContextProvider>
            <Navbar />
            <Flex alignItems="center" justifyContent="center" w="full" bg="gray.800" minH="25vh">
                <Container maxW="container.md">
                    <Heading as="h1" textAlign="center" fontSize={["2xl", "2xl", "3xl"]} color="whiteAlpha.900">What do you need help with?</Heading>
                    <Input ref={searchBar} type="text" onChange={handleSearch} w="full" mt="5" size="lg" borderColor="blackAlpha.300" shadow="sm" placeholder="Search..." bg="white" />
                    <Box w="full" position="relative">
                        <Fade in={results.length > 0}>
                            {results.length > 0 && 
                                <Box w="full" mt="2" position="absolute" p="2" shadow="sm" borderWidth="thin" borderColor="blackAlpha.300" bgColor="white" borderRadius="5">
                                    {results.map(result => {
                                        return (
                                                <Link onClick={handleClick} key={result.sys.id} href={`/post/${result.sys.id}`}>
                                                    <Stack role="group" direction="row" mb="2" justify="space-between" alignItems="center"  _hover={{ bgColor: "blue.50" }} transition="0.2s ease" p="3" borderRadius="3">
                                                        <Box>
                                                            <Text fontSize="md" fontWeight="semibold">{result.fields.title['en-US']}</Text>
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
                                                </Link>
                                        )
                                    })}
                                </Box>
                            }
                        </Fade>
                    </Box>
                </Container>
            </Flex>

            {children}
        </AuthContextProvider>
    )
}