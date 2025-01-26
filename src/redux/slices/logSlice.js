import { createSlice } from "@reduxjs/toolkit"

export const logSlice = createSlice({
    name: "logSlice",
    initialState: {
        token: ""
    },
    reducers: {
        login (state , action) {
            state.token = action.payload;
            sessionStorage.setItem("token" , state.token )
        },
        logout (state) {
            state.token = "";
            sessionStorage.removeItem("token")
        }
    }
})

export const logActions = logSlice.actions