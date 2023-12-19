'use client'

import { Box, Collapse, Container, Fade, Flex, Heading, Icon, Input, Portal, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "./UI/icons";


export default function Layout({ children }) {
    const [search, setSearch] = useState('');

    return (
        <>
            <Flex alignItems="center" justifyContent="center" w="full" bg="gray.800" minH="25vh">
                <Container maxW="container.md">
                    <Heading as="h1" textAlign="center" fontSize={["2xl", "2xl", "3xl"]} color="whiteAlpha.900">What do you need help with?</Heading>
                    <Input type="text" onChange={e => {setSearch(e.currentTarget.value)}} w="full" mt="5" size="lg" borderColor="blackAlpha.300" shadow="sm" placeholder="Search..." bg="white" />
                    <Box w="full" position="relative">
                        <Fade in={search.length > 0}>
                            {search.length > 0 && 
                                <Box w="full" mt="2" position="absolute" p="2" shadow="sm" borderWidth="thin" borderColor="blackAlpha.300" bgColor="white" borderRadius="5">
                                    <Link href="/center">
                                        <Stack role="group" direction="row" mb="2" justify="space-between" alignItems="center"  _hover={{ bgColor: "blue.50" }} transition="0.2s ease" p="3" borderRadius="3">
                                            <Box>
                                                <Text fontSize="md" fontWeight="semibold">How to sign a purchase agreement</Text>
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

                                    <Link href="/center">
                                        <Stack role="group" direction="row" mb="2" justify="space-between" alignItems="center"  _hover={{ bgColor: "blue.50" }} transition="0.2s ease" p="3" borderRadius="3">
                                            <Box>
                                                <Text fontSize="md" fontWeight="semibold">Showing A Home</Text>
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
                                </Box>
                            }
                        </Fade>
                    </Box>
                </Container>
            </Flex>

            {children}
        </>
    )
}