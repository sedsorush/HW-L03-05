import { configureStore } from "@reduxjs/toolkit"
import { booksApi } from "./slices/booksApiSlice"
import { logSlice } from "./slices/logSlice"

export const store = configureStore ({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
        logReducer: logSlice.reducer
    },
    middleware: (getPrevMiddleware)=>{
        return getPrevMiddleware().concat(booksApi.middleware)
    }
})