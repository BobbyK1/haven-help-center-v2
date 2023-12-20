'use client'

import { Box, Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerMenu } from "../(main)/UI/icons";


export default function NavbarNoAuth() {


    return (
        <Box w="full" borderBottomWidth="thin" borderColor="blackAlpha.200" shadow="sm" p="5">
            <Stack direction="row" justify="space-between" alignItems="center">
                <Link href="/collections">
                    <Stack direction="row" spacing="" alignItems="flex-end">
                        <Text fontSize="lg" fontWeight="semibold"><Text as="span" fontWeight="bold">HAVEN</Text> Help Center</Text>
                    </Stack>
                </Link>
                
                <>
                    <Box display={[ "none", "none", "inline-block"]}>
                        <Button variant="ghost" size="sm">Log in</Button>
                        <Button variant="ghost" size="sm">Sign up</Button>
                    </Box>
                    <Box display={[ "inline-block", "inline-block", "none" ]}>
                        <Menu>
                            <MenuButton as={IconButton} icon={<HamburgerMenu fontSize="xl" />} variant="ghost" size="md" />

                            <MenuList>
                                <Link href="/">
                                    <MenuItem>Log In</MenuItem>
                                </Link>
                                <Link href="/sign-up">
                                    <MenuItem>Sign Up</MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                    </Box>
                </>
            </Stack>
        </Box>
    )
}