import {createSlice} from '@reduxjs/toolkit'

export interface EditState{
    isOpen : boolean;
} 

const initialState: EditState = {
    isOpen : false,
}

const EditSlice = createSlice({
    name : "edit",
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

export const {onOpen, onClose} = EditSlice.actions

export default EditSlice.reducer