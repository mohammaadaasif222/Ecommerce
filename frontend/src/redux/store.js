import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/getAllProductsSlice";
import productReducer from './features/productDetailSlice'

const store = configureStore({
    reducer:{
        Products : productsReducer,
        Product:productReducer
    },
})

export default store;