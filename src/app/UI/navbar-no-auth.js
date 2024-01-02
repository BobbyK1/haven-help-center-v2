'use client'

import { Box, Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerMenu } from "../(main)/UI/icons";


export default function NavbarNoAuth() {


    return (
        <Box w="full" borderBottomWidth="thin" borderColor="blackAlpha.200" shadow="sm" p="5">
            <Stack direction="row" justify="space-between" alignItems="center">
                <Link href="/">
                    <Stack direction="row" spacing="" alignItems="flex-end">
                        <Text fontSize="lg" fontWeight="semibold"><Text as="span" fontWeight="bold">HAVEN</Text> Help Center</Text>
                    </Stack>
                </Link>
            </Stack>
        </Box>
    )
}