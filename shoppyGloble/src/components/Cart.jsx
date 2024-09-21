import { Flex,Image,Card,CardBody,IconButton,Box, Link, Tooltip, AlertIcon, Alert, Button, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useState, useEffect } from "react";
import { removeProduct } from "../../utils/cartSlice";

export default function Cart(){
    const [width, setWidth] = useState(window.innerWidth);
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch()
    const toast = useToast();
    function removeItem(id){
        dispatch(removeProduct(id));
    }
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return(
        <Flex direction="column" bg="#EDF2F7" wrap="wrap" minH="90vh" p="10px"> 
        {
            (cartItems.length > 0) ? 
            (<>
                {cartItems.map((item) => (
                <Card key={item.id} w="100%" mb="10px">
                    <CardBody>
                        <Flex wrap="wrap" alignItems="center" justifyContent="space-between"> 
                            <Link as={RouterLink} to={"/product/"+item.id} _hover={{ textDecor: 'none' }}>
                                <Image src={item.image} w="2.5rem" h="2.5rem" border="2px solid #2D3748"/>
                            </Link>
                            <Box w={(width > 750)?"16%":"100%"}>
                                <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Title : <span style={{color:"#718096"}}>{item.title}</span></p>
                            </Box>
                            <Box w={(width > 750)?"16%":"100%"}>
                                <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Brand : <span style={{color:"#718096"}}>{item.brand}</span></p>
                            </Box>
                            <Box w={(width > 750)?"16%":"100%"}>
                                <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Price :  <span style={{color:"#718096"}}>{item.price}</span></p>
                            </Box>
                            <Box w={(width > 750)?"16%":"100%"}> 
                                <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Qty : <span style={{color:"#718096"}}>{item.qty}</span></p>
                            </Box>
                            <Flex w={(width < 750)&&"100%"} alignItems="center" justifyContent="flex-end">
                                <Tooltip label="Remove Item">
                                    <IconButton colorScheme='red' aria-label='Remove Item' icon={<SmallCloseIcon />} onClick={() => removeItem(item.id)}/>
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </CardBody>
                </Card>))}
                <Flex wrap="wrap" alignItems="center" justifyContent="flex-end"><Button bg="#2D3748" color="#EDF2F7" _hover={{bg:"#718096"}} 
                onClick={() => toast({
                    title: 'Payment Tansaction is not integrated yet',
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                })}>Proceed for payment</Button></Flex>
            </>
            ): 
            <Alert status='info'> <AlertIcon /> Cart is Empty </Alert>
        }

        </Flex>

    )
}