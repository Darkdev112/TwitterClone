import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface RegisterState{
    isOpen : boolean;
} 

const initialState: RegisterState = {
    isOpen : false,
}

const registerSlice = createSlice({
    name : "register",
    initialState,
    reducers : {
        inOpen : (state) => {
            state.isOpen = true
        },
        inClose : (state) => {
            state.isOpen = false
        }
    }
}) 

export const {inOpen, inClose} = registerSlice.actions

export default registerSlice.reducer