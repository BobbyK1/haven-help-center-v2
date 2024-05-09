'use client'

import { Icon } from "@chakra-ui/react"
import { AiOutlineCheckCircle, AiOutlineFileImage } from "react-icons/ai";
import { FaCircle, FaCircleDot } from "react-icons/fa6";

export const Form = (props) => {
    return <Icon as={AiOutlineFileImage} {...props} />
}

export const Unselected = (props) => {
    return <Icon as={FaCircle} {...props} />
}

export const Selected = (props) => {
    return <Icon as={FaCircleDot} {...props} />
}

export const Check = (props) => {
    return <Icon as={AiOutlineCheckCircle} {...props} />
}