import { Flex, Heading } from "@chakra-ui/react";
export default function Error({error}){
    return (
        <Flex bg="#EDF2F7" alignItems="center" justifyContent="center" minH="90vh" flexDir="column">
            <Heading as='h4' fontSize='lg' mb='3'color="#F56565" textAlign='center'>Error Messages</Heading>
            {error.map((e,i)=><Heading as='h4' fontSize='lg' mb='3'color="#718096" textAlign='center' key={i}> {e}</Heading>)}
        </Flex>
    )
}