import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice.js'
import cartReducer from './cartSlice.js'

const appStore = configureStore({
    reducer : {
        products : productReducer,
        cart : cartReducer,
    }
})

export default appStore;