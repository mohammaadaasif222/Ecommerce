import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/getAllProductsSlice";
import productReducer from './features/productDetailSlice'
import authSlice  from './features/authSlice'

const store = configureStore({
    reducer:{
        Products : productsReducer,
        Product:productReducer,
        User:authSlice,
    },
})

export default store;