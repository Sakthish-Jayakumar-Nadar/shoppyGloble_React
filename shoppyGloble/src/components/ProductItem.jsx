import { Box, Link, Image, Heading, Flex, Tooltip, Button, useToast } from "@chakra-ui/react";
import { StarIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { useDispatch } from "react-redux";
import { Link as RouterLink } from 'react-router-dom'
import { addProduct } from "../../utils/cartSlice"; 

export default function ProductItem({id, src, title, price, brand, rating}){
	const dispatch = useDispatch();
	const toast = useToast();
	function addToCart(){
        const obj = {
            id : id,
            image : src,
            title : title,
            brand : brand,
            price : price,
            qty : 1,
        }
        dispatch(addProduct(obj));
        toast({
            title: 'Product added',
            status: 'success',
            duration: 1000,
            isClosable: true,
          })
    }
    return (
		<Box maxW='sm' borderRadius='lg' minW="15rem" bgColor='white' _hover={{ shadow: 'lg' }}>
			<Link as={RouterLink} to={"/product/"+id} _hover={{ textDecor: 'none' }}>
			<Image src={src} w='full' h='350px' objectFit='cover'/>
			</Link>
			<Box py='4' px='4'>
				<Heading as='h4' fontSize='lg' mb='3'color="#718096" textAlign='center'> {title}</Heading>
			</Box>
			<Flex justifyContent="space-between" alignItems="center" wrap="wrap" px="4">
				<Flex fontSize='xl' mb='3'color="#718096" justifyContent="center" alignItems="center">{"Price : " + price + " $"}</Flex>
				<Flex fontSize='xl' mb='3'color="#718096" justifyContent="center" alignItems="center"><StarIcon color="#ECC94B" />{rating}</Flex>
			</Flex>
			<Flex alignItems="center" justifyContent="flex-end" pr="5px" pb="5px">
				<Tooltip label="Add to Cart">
					<Button bg="#CBD5E0" color="#4A5568" onClick={addToCart}><PlusSquareIcon /></Button>
				</Tooltip>
			</Flex>
		</Box>
    )
}