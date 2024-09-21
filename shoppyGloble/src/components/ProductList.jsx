import { Box } from "@chakra-ui/react";
import ProductItem from "./ProductItem";

export default function ProductList({ products }){
    return (
        <>
            { products.map((product) => (
                <Box key={product.id} p='30'>
                    <ProductItem id={product.id} src={product.images[0]} title={product.title} price={product.price} brand={product.brand} rating={product.rating} />
                </Box> 
            ))}
        </>
    )
}