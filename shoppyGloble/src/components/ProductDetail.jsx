import { Flex, Image, Text, Heading, Card, CardBody, Avatar, Button, Select, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { StarIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { addProduct } from "../../utils/cartSlice"; 

export default function ProductDetail(){
    const [product, setProduct] = useState({});
    const [error, setError] = useState([]);
    const [qty, setQty] = useState("");
    const [arr, setArr] = useState([])
    const { id } = useParams();
    const toast = useToast();
    const dispatch = useDispatch();
    async function loadProductDetial(){
        try {
            const response = await fetch('https://dummyjson.com/products/'+id);
            const data =  await response.json();
            setProduct(data);
            if(data.stock){
                setArr([...new Array(data.stock)]);
            }
            
        } catch (err) {
            setError([...error, err.message]);
        }
    }
    function addToCart(){
        const obj = {
            id : id,
            image : product.images[0],
            title : product.title,
            brand : product.brand,
            price : product.price,
            qty : qty,
        }
        dispatch(addProduct(obj));
        toast({
            title: 'Product added',
            status: 'success',
            duration: 1000,
            isClosable: true,
          })
    }
    useEffect(()=>{
        loadProductDetial()
    },[])
    return(
        <>{
            (product != null && product.id != undefined) ?
            <Flex bg="#EDF2F7" wrap="wrap" minH="90vh">
                <Flex w="100vw" wrap="wrap" bg="#EDF2F7" alignItems="center" justifyContent="space-around"> 
                    <Image src={product.images[0]} w='full' h='auto' objectFit='cover' maxW='sm' borderRadius='lg' minW="15rem" bgColor='white' shadow='lg' m="10px"/>
                    <Flex flexDir="column" alignItems="flex-start" justifyContent="flex-start" m="5px">
                        <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Title : <span style={{color:"#718096"}}>{product.title}</span></p>
                        <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Brand : <span style={{color:"#718096"}}>{product.brand}</span></p>
                        <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Category : <span style={{color:"#718096"}}>{product.category}</span></p>
                        <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Price : <span style={{color:"#718096"}}>{product.price+" $"}</span></p>
                        <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Rating : <span style={{color:"#718096"}}><StarIcon color="#ECC94B"/>{product.rating}</span></p>
                        <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748"}}>Status : <span style={{color:"#EDF2F7", backgroundColor:(product.availabilityStatus == "Low Stock")?"#ECC94B":(product.availabilityStatus == "In Stock")?"#48BB78":"#F56565"}}>{product.availabilityStatus}</span></p>
                        <p style={{fontWeight:"bolder",fontSize:"1.2rem",color:"#2D3748", maxWidth:"65rem"}}>Description : <span style={{color:"#718096"}}>{product.description}</span></p>
                        <Flex ml="10px" mt="10px" mb="10px">
                            <Select placeholder='Qty'bg="#CBD5E0" w="6rem" color="#4A5568" borderRightRadius="0" onChange={(e) => setQty(e.target.value)}>
                                {
                                    arr.map((e,i)=>(<option key={i+1} value={i+1}>{i+1}</option>))
                                }
                            </Select>
                            <Button bg="#CBD5E0" color="#4A5568" w="6.2rem" borderLeftRadius="0" isDisabled={(qty == "")?true:false} onClick={addToCart}>Add To Cart</Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Heading as='h4' w="100%" fontSize='lg' mb='3'color="#2D3748" display="flex" alignItems="center" justifyContent="center"> Reviews </Heading>
                <Flex w="100vw" flexDir="column" alignItems="center" justifyContent="center" m="10px">
                    {
                        product.reviews.map((review,i) => (
                        <Card m="10px" key={review.reviewerEmail + "_" + i} w="100%">
                            <CardBody>
                                <Flex wrap="wrap" alignItems="center">
                                    <Avatar src='shoppyGloble\public\accountLogo.webp'/>
                                    <Flex flexDir="column" color="#2D3748" wrap="wrap" pl="5px">
                                        <Text fontSize="small">{review.reviewerName}</Text>
                                        { review.comment } 
                                        <p><StarIcon color="#ECC94B"/>{review.rating}</p>
                                    </Flex>
                                </Flex>
                            </CardBody>
                        </Card>
                        ))
                    }
                </Flex>
            </Flex>
            : <Loader />
        }</>
    )
}