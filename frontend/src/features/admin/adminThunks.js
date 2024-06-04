import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


//admin login thunk

export const adminLogin = createAsyncThunk('admin/login', async(form, thunkAPI) => {
    try{
        const config = { headers: { "Content-Type" : "application/json" }}
        const { data } = await axios.post('/api/v1/admin/login', form, config)

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})


//admin logout thunk

export const adminLogout = createAsyncThunk('admin/logout', async(thunkAPI) => {
    try{
        const { data } = await axios.post('/api/v1/admin/logout')

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})


//load admin user

export const loadadminuser = createAsyncThunk('admin/dashboard', async(thunkAPI) => {
    try{
        const { data } = await axios.get('/api/v1/admin/dashboard')

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})