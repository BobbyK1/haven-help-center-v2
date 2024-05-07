import { Form } from "@/app/UI/icons";
import { Box, Button, Container, Divider, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";


export default function Page() {
    
    return (
        <Container maxW="container.xl" py="20">
            <Box>
                <Heading as="h2" fontSize="3xl">Everyday Apps</Heading>
                <Divider my="5" borderColor="blackAlpha.600" />
                <SimpleGrid columns={[1, 1, 2, 3]} gap="10">
                    <Button as={Link} href="https://www.findnwindianahomesforsale.com/" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/Cinc-Logo.svg" height="100" width="150" />
                    </Button>

                    <Button as={Link} href="https://nira.flexmls.com/ticket" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/nira-logo.png" height="100" width="150" />
                    </Button>

                    <Button as={Link} href="https://discord.gg/ePhX6JnzB9" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Box p="2" bgColor="#5865F2" borderRadius="5">
                            <Image src="/discord-logo-white.svg" height="100" width="150" />
                        </Box>
                    </Button> 

                    <Button as={Link} href="https://www.zipformplus.com/" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/zipforms-logo.png" height="100" width="150" />
                    </Button> 

                    <Button as={Link} href="https://havenrealty.bamboohr.com/login.php" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/bamboohr-logo.png" height="100" width="150" />
                    </Button> 

                    <Button as={Link} href="https://narrpr.com" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/rpr-logo.jpg" height="100" width="150" />
                    </Button> 
                </SimpleGrid>
            </Box>

            <Box mt="10">
                <Heading as="h2" fontSize="3xl">Resources</Heading>
                <Divider my="5" borderColor="blackAlpha.600" />


                <SimpleGrid columns={[1, 1, 2, 3]} gap="10">
                    <Button as={Link} href="https://forms.gle/KDTQe3JBAG6UbEaN8" target="_blank" flexDirection="column" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Form fontSize="6xl" />
                        <Text fontSize="xl" mt="2">Curated Social Media Posts</Text>
                    </Button> 

                    <Button as={Link} href="https://www.canva.com/" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/canva-logo.png" height="100" width="100" />
                    </Button>

                    <Button as={Link} href="https://lblba.sentrilock.com/login/loginpage" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/sentrilock-logo.jpg" height="100" width="150" />
                    </Button>  

                    <Button as={Link} href="https://setup-sso.showingtime.com/Account/Login?ReturnUrl=%2f" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/showing-logo.png" height="100" width="150" />
                    </Button>  

                    <Button as={Link} href="https://mylicense.in.gov/eGov/Login.aspx" target="_blank" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/pla-logo.png" height="100" width="100" />
                    </Button>  

                    <Button as={Link} href="https://drive.google.com/drive/folders/1-FY-BKwi8wJjMeXMjkDlhS5-3KKzzqMD?usp=drive_link" target="_blank" flexDirection="column" bgColor="white" _hover={{ transform: "scale(1.02)" }} transition="0.5s ease" shadow="lg" borderRadius="5" w="full" h="52">
                        <Image src="/drive-logo.png" height="100" width="100" />
                        <Text fontSize="xl" mt="2">Logos</Text>
                    </Button>  
                </SimpleGrid>
            </Box>
        </Container>
    )
}