import { createSlice } from "@reduxjs/toolkit";
import {
    sellerlogin,
    sellerlogout,
    applySeller,
    addProduct,
    deleteProduct,
    updateProduct,
    loadSeller,
    getProductDetails,
    deleteMultipleProducts
} from './sellerThunks'

const initialState = {
    seller: {},
    sellerProducts: {},
    productDetails: {},
    sellerLoading: false,
    isSellerAuthenticated: false,
    sellerMessage: null,
    sellerError: null
}

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            //seller login pending
            .addCase(sellerlogin.pending, (state) => {
                return{
                    ...state,
                    sellerLoading: true,
                    isSellerAuthenticated: false,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //seller login fulfilled
            .addCase(sellerlogin.fulfilled, (state, action) => {
                return{
                    ...state,
                    seller: action.payload.seller,
                    sellerProducts: action.payload.sellerProducts,
                    sellerLoading: false,
                    isSellerAuthenticated: true,
                }
            })

            //seller login rejected
            .addCase(sellerlogin.rejected, (state, action) => {
                return{
                    ...state,
                    seller: null,
                    sellerLoading: false,
                    isSellerAuthenticated: false,
                    sellerError: action.payload
                }
            })

            //seller logout pending
            .addCase(sellerlogout.pending, (state) => {
                return{
                    ...state,
                    sellerLoading: true,
                    isSellerAuthenticated: true,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //seller logout fulfilled
            .addCase(sellerlogout.fulfilled, (state, action) => {
                return{
                    ...state,
                    seller: null,
                    sellerProducts : null,
                    sellerLoading: false,
                    isSellerAuthenticated: false,
                    sellerMessage: action.payload.message
                }
            })

            //seller logout rejected
            .addCase(sellerlogout.rejected, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    sellerError: action.payload
                }
            })

            //seller application pending
            .addCase(applySeller.pending, (state) =>{
                return{
                    ...state,
                    sellerLoading: true,
                    isSellerAuthenticated: false,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //seller application fulfilled
            .addCase(applySeller.fulfilled, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    isSellerAuthenticated: false,
                    sellerMessage: action.payload.message
                }
            })

            //seller application rejected
            .addCase(applySeller.rejected, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    isSellerAuthenticated: false,
                    sellerError: action.payload
                }
            })

            //product add pending
            .addCase(addProduct.pending, (state) => {
                return{
                    ...state,
                    sellerLoading: true,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //product add fulfilled
            .addCase(addProduct.fulfilled, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    sellerProducts: action.payload.products,
                    sellerMessage: action.payload.message
                }
            })

            //product add rejected
            .addCase(addProduct.rejected, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    sellerError: action.payload
                }
            })

            //product delete pending
            .addCase(deleteProduct.pending, (state) => {
                return{
                    ...state,
                    sellerLoading: true,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //product delete fulfilled
            .addCase(deleteProduct.fulfilled, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    sellerProducts: action.payload.products,
                    sellerMessage: action.payload.message
                }
            })

            //product delete rejected
            .addCase(deleteProduct.rejected, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    sellerError: action.payload
                }
            })

            //multiple products delete pending
            .addCase(deleteMultipleProducts.pending, (state) => {
                return{
                    ...state,
                    sellerLoading: true,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //multipe products delete fulfilled
            .addCase(deleteMultipleProducts.fulfilled, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    sellerProducts: action.payload.products,
                    sellerMessage: action.payload.message
                }
            })

            //multiple products delete rejected
            .addCase(deleteMultipleProducts.rejected, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    sellerError: action.payload
                }
            })

            //product update pending
            .addCase(updateProduct.pending, (state) => {
                return{
                    ...state,
                    sellerLoading: true,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //product update fufilled
            .addCase(updateProduct.fulfilled, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    productDetails: action.payload.product,
                    sellerProducts: action.payload.products,
                    sellerMessage: action.payload.message
                }
            })

            //product update rejected
            .addCase(updateProduct.rejected, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    sellerError: action.payload
                }
            })

            //get product details pending
            .addCase(getProductDetails.pending, (state) => {
                return{
                    ...state,
                    sellerLoading: true,
                    productDetails: null,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //get product details fulfilled
            .addCase(getProductDetails.fulfilled, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    productDetails: action.payload.product
                }
            })

            //get product details rejected
            .addCase(getProductDetails.rejected, (state, action) => {
                return{
                    ...state,
                    sellerLoading: false,
                    productDetails: null,
                    sellerMessage: null,
                    sellerError: null
                }
            })


            //load seller pending
            .addCase(loadSeller.pending, (state) => {
                return{
                    ...state,
                    seller: null,
                    sellerProducts: null,
                    sellerLoading: true,
                    isSellerAuthenticated: false,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //load seller fulfilled
            .addCase(loadSeller.fulfilled, (state, action) => {
                return{
                    ...state,
                    seller: action.payload.sellerUser,
                    sellerProducts: action.payload.sellerProducts,
                    sellerLoading: false,
                    isSellerAuthenticated: true,
                    sellerMessage: null,
                    sellerError: null
                }
            })

            //load seller rejected
            .addCase(loadSeller.rejected, (state, action) => {
                return{
                    ...state,
                    seller: null,
                    sellerProducts: null,
                    sellerLoading: false,
                    isSellerAuthenticated: false,
                    sellerMessage: null,
                    sellerError: null
                }
            })
    }
})

export default sellerSlice.reducer