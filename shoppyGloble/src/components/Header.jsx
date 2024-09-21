import { Link, Flex, Box } from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";

export default function Header() {
    return (
        <Flex h="10vh" alignItems="center" justifyContent="space-between" bg="#2D3748" px="20px">
            <Link as={RouterLink} to="/" fontSize="lg" ml="20px" color="#EDF2F7" _hover={{textDecoration : "none"}}>ShoppyGloble</Link>
            <Box>
                <Link as={RouterLink} to="/" fontSize="lg" ml="20px" color="#EDF2F7">Home</Link>
                <Link as={RouterLink} to="/cart" fontSize="lg" ml="20px" color="#EDF2F7">Cart</Link>
            </Box>
        </Flex>
    )
}