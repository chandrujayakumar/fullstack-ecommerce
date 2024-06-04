import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


//send otp through email 

export const sendotp = createAsyncThunk('user/sentotp', async(email, thunkAPI) => {
    try{
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/api/v1/user/sendotp', { email }, config)

        return data.message
    }catch(error){
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
})


//login/signup 

export const loginsignup = createAsyncThunk("user/loginsignup", async(form, thunkAPI) => {
    try{
        const config = { headers : { "Content-Type" : "application/json" }};
        const { data } = await axios.post('/api/v1/user/loginsignup', form, config)

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})

//signup new user
export const signupuser = createAsyncThunk("user/signupuser", async(form, thunkAPI) => {
    try{
        const config = { headers : { "Content-Type" : "application/json" }};
        const { data } = await axios.post('/api/v1/user/signupuser', form, config)

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})


//logout
export const logoutuser = createAsyncThunk("user/logout", async(thunkAPI) => {
    try{
        const { data } = await axios.post('/api/v1/user/logout')

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})



//load user initially

export const loaduser = createAsyncThunk("user/loaduser", async(thunkAPI) => {
    try{
        const { data } = await axios.get('/api/v1/user/dashboard')

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})