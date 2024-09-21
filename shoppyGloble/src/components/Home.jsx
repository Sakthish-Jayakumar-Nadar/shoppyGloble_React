import { Button, Flex, Select, Input, AlertIcon, Alert } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setProducts } from "../../utils/productSlice";
import ProductList from "./ProductList";
import Loader from "./Loader";
import Error from "./Error";

export default function Home(){
    const [searchName, setSearchName] = useState("");
    const [categories, setCategories] = useState([]);
    const [productLoading, setProductLoading] = useState(true);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const products = useSelector((store) => store.products.items);
    const dispatch = useDispatch()

    function getCategoryProducts(category){
        setLoading(true);
        fetch((category != "" && category != undefined)? 'https://dummyjson.com/products/category/'+category : 'https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => dispatch(setProducts(data.products)))
        .then(()=>setLoading((pre)=>!pre))
        .catch((err) => setError([...error, err.message]));
    }
    function searchProducts(){
        setLoading(true);
        fetch((searchName.trim() != "")? 'https://dummyjson.com/products/search?q='+searchName  : 'https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => dispatch(setProducts(data.products)))
        .then(() => setSearchName(""))
        .then(()=>setLoading((pre)=>!pre))
        .catch((err) => setError([...error, err.message]));
    }
    async function loadProducts(){
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data =  await response.json();
            if(data != null && data != undefined){
                dispatch(setProducts(data.products));
            }
            setProductLoading(false);
            setLoading(false);
        } catch (err) {
            setError([...error, err.message]);
        }
    }
    async function loadCategories(){
        try {
            const response = await fetch('https://dummyjson.com/products/categories');
            const data =  await response.json();
            if(data != null && data != undefined){
                setCategories(data);
            }
            setCategoryLoading(false);
            setLoading(false);
        } catch (err) {
            setError([...error, err.message]);
        }
    }
    useEffect(()=>{
        loadProducts();
        loadCategories();
    },[])
    return (
        <>
            {(!productLoading && !categoryLoading && !loading) ?
            (<Flex bg="#EDF2F7" wrap="wrap" minH="90vh">
                <Flex w="100%" h="5rem" alignItems="center" justifyContent="center" wrap="wrap">
                    <Select placeholder='Category' w="12rem" bg="#CBD5E0" color="#4A5568" m="10px" onChange={(e)=>getCategoryProducts(e.target.value)}>
                        {categories.map((category) => (<option key={category.slug} value={category.slug}>{category.name}</option>))}
                    </Select>
                    <Flex alignItems="center" justifyContent="center" m="10px">
                        <Input placeholder='Search' borderWidth="3px" borderColor="#CBD5E0" maxW="30rem" borderTopRightRadius="0px" borderBottomRightRadius="0px" value={searchName} onChange={(e) => {setSearchName(e.target.value)}}/>
                        <Button bg="#CBD5E0" color="#4A5568" borderTopLeftRadius="0px" borderBottomLeftRadius="0px" onClick={searchProducts}><SearchIcon /></Button>
                    </Flex>
                </Flex>
                {
                    (products.length > 0) ? 
                    (<Flex alignItems="center" justifyContent='space-around' wrap="wrap" bg="#EDF2F7" pt="10px">
                        <ProductList products={products}/> 
                    </Flex>) : <Alert status='info' w="100%" h="4rem"> <AlertIcon /> No product with name "{searchName}" found </Alert>
                }
            </Flex>) : (error.length > 0) ? <Error error={error} /> : <Loader />}
        </>
    )
}