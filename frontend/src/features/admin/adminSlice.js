import { createSlice } from "@reduxjs/toolkit"
import {
    adminLogin,
    adminLogout,
    loadadminuser
} from './adminThunks'

const initialState = {
    admin: {},
    adminLoading: false,
    isAdminAuthenticated: false,
    adminMessage: null,
    adminError: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            //admin Login pending
            .addCase(adminLogin.pending, (state) => {
                return{
                    ...state,
                    adminLoading: true,
                    isAdminAuthenticated: false,
                    adminMessage: null,
                    adminError: null
                }
            })

            //admin Login fulfilled
            .addCase(adminLogin.fulfilled, (state, action) => {
                return{
                    ...state,
                    admin: action.payload.admin,
                    adminLoading: false,
                    isAdminAuthenticated: true,
                }
            })

            //admin Login rejected
            .addCase(adminLogin.rejected, (state, action) => {
                return{
                    ...state,
                    admin: null,
                    adminLoading: false,
                    isAdminAuthenticated: false,
                    adminError: action.payload
                }
            })

            //admin Logout pending
            .addCase(adminLogout.pending, (state) => {
                return{
                    ...state,
                    adminLoading: true,
                    isAdminAuthenticated: true,
                    adminMessage: null,
                    adminError: null
                }
            })

            //admin Logout fulfilled
            .addCase(adminLogout.fulfilled, (state, action) => {
                return{
                    ...state,
                    admin: null,
                    adminLoading: false,
                    isAdminAuthenticated: false,
                    adminMessage: action.payload.message
                }
            })

            //admin Logout rejected
            .addCase(adminLogout.rejected, (state, action) => {
                return{
                    ...state,
                    adminLoading: false,
                    adminError: action.payload
                }
            })

            //load admin user pending
            .addCase(loadadminuser.pending, (state) => {
                return{
                    ...state,
                    admin: null,
                    adminLoading: true,
                    isAdminAuthenticated: false,
                    adminMessage: null,
                    adminError: null
                }
            })

            //load admin user fulfilled
            .addCase(loadadminuser.fulfilled, (state, action) => {
                return{
                    ...state,
                    admin: action.payload.adminUser,
                    adminLoading: false,
                    isAdminAuthenticated: true,
                    adminMessage: null,
                    adminError: null
                }
            })

            //load admin user rejected
            .addCase(loadadminuser.rejected, (state, action) => {
                return{
                    ...state,
                    admin: null,
                    adminLoading: false,
                    isAdminAuthenticated: false,
                    adminMessage: null,
                    adminError: null
                }
            })

    }
})

export default adminSlice.reducer