import { createSlice } from "@reduxjs/toolkit";

export interface userDetailsState{
    name : string;
    email : string;
    username : string;
    password : string;
}

const initialState : userDetailsState = {
    name : "",
    email : "",
    password : "",
    username : "",
}

const clientDetailsSlice = createSlice({
    name : "clientDetails",
    initialState,
    reducers : {
        setName : (state, action) => {
            const e = action.payload;
            state.name = e;
        },
        setEmail : (state, action) => {
            const e = action.payload;
            state.email= e;
        },
        setPassword : (state, action) => {
            const e = action.payload;
            state.password = e;
        },
        setUsername : (state, action) => {
            const e = action.payload;
            state.username= e;
        },
    }
})

export const {setName, setEmail, setPassword, setUsername} = clientDetailsSlice.actions

export default clientDetailsSlice.reducer