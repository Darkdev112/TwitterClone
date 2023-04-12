import { configureStore } from "@reduxjs/toolkit"
import loginReducer from './slice/loginSlice'
import registerReducer from './slice/registerSlice'

export const store = configureStore({
    reducer : {
        login : loginReducer,
        register : registerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch