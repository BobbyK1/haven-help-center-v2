'use client'

import { Icon } from "@chakra-ui/react"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

export const ChevronRight = (props) => {
    return <Icon as={AiOutlineRight} {...props} />
}

export const ChevronLeft = (props) => {
    return <Icon as={AiOutlineLeft} {...props} />
}