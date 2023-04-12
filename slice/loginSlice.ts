import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface loginState{
    isOpen : boolean;
} 

const initialState: loginState = {
    isOpen : false,
}

const loginSlice = createSlice({
    name : "login",
    initialState,
    reducers : {
        onOpen : (state) => {
            state.isOpen = true
        },
        onClose : (state) => {
            state.isOpen = false
        }
    }
}) 

export const {onOpen, onClose} = loginSlice.actions

export default loginSlice.reducer