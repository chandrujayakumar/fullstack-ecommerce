import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

//seller login thunk

export const sellerlogin = createAsyncThunk('seller/login', async(form, thunkAPI) => {
    try{
        const config = { headers: {"Content-Type" : "application/json"} }
        const { data } = await axios.post('/api/v1/seller/login', form, config)
        
        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})


//seller logout thunk

export const sellerlogout = createAsyncThunk('seller/logout', async(thunkAPI) => {
    try{
        const { data } = await axios.post('/api/v1/seller/logout')

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})

//apply seller (new seller)

export const applySeller = createAsyncThunk('seller/apply', async(form, thunkAPI) => {
    try{
        const config = { headers: { "Content-Type" : "application/json" } }
        const { data } = await axios.post('/api/v1/seller/apply', form, config)

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})


//add product thunk

export const addProduct = createAsyncThunk('seller/product/add', async(form, thunkAPI) => {
    try{
        const { data } = await axios.post('/api/v1/seller/addproduct', form)

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})

//delete product thunk

export const deleteProduct = createAsyncThunk('seller/product/delete', async(id, thunkAPI) => {
    try{
        const config = { headers: { "Content-Type" : "application/json" } }
        const { data } = await axios.delete(`/api/v1/seller/deleteproduct/${id}`, config)

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})


//load seller user

export const loadSeller = createAsyncThunk("seller/dashboard", async(thunkAPI) => {
    try{
        const { data } = await axios.get('/api/v1/seller/dashboard')

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})