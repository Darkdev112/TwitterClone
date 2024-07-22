import { configureStore } from "@reduxjs/toolkit"
import loginReducer from './slice/loginSlice'
import registerReducer from './slice/registerSlice'
import clientDetailsReducer from './slice/clientDetailsSlice'
import EditReducer from "./slice/EditSlice"

export const store = configureStore({
    reducer : {
        login : loginReducer,
        register : registerReducer,
        clientDetails : clientDetailsReducer,
        edit : EditReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch