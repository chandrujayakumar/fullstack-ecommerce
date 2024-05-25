import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import userReducer from "./features/user/userSlice"
import adminReducer from "./features/admin/adminSlice"

//combine reducers

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer
})

//configure store

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true
})