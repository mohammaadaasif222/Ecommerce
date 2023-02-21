import {createSlice} from '@reduxjs/toolkit'
import { fetchProductDetails } from '../../actions/productActions'

const initialState ={}


const getProductDetails = createSlice({
    name:'product',
    initialState,

    extraReducers:(builder)=>{
        builder.addCase(fetchProductDetails.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload
            state.error =''
        })
        builder.addCase(fetchProductDetails.rejected,(state, action)=>{
           state.loading = true
           state.data =[]
           state.error = action.error.message
        })
    }
})

export default getProductDetails.reducer