import { Flex, Heading, Link } from "@chakra-ui/react"
import { useRouteError, Link as RouterLink } from "react-router-dom"

export default function NotFound(){
    let err = useRouteError();
    return (
        <Flex alignItems="center" justifyContent="center" flexDir="column">
            <Heading as="h1" fontSize='3xl' color="#718096">{err.status + " " + err.data}</Heading>
            <Link as={RouterLink} to="/">Home Page</Link>
        </Flex>
    )
}