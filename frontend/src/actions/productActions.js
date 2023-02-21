import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

// Getting all products 
export const fetchProudcts = createAsyncThunk('products/fetchProducts',async (keyword , activePage=2)=>{
    const response = await axios.get(`http://localhost:5000/products?keyword=${keyword}&page=${activePage}`)
    return response.data
})


// Getting single product
export const fetchProductDetails = createAsyncThunk('product/fetchProductDetails ',(id)=>{
    return axios.get(`http://localhost:5000/product/${id}`).then((response)=>response.data)
})