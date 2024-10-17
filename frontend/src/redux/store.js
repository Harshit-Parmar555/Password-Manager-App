import {configureStore , createSlice} from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: 'auth',
    initialState:{
        islogin:false,
    },
    reducers:{
        login(state){
            state.islogin = true
        },
        logout(state){
            state.islogin = false
        }
    }
})

export const authActions = authSlice.actions
export const store = configureStore({
    reducer: authSlice.reducer
})