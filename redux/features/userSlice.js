import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    value :{
        modalSignUp : false
    }
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        handleModalSignUp : (state, action)=>{
            state.value.modalSignUp = action.payload
        }
    }
}) 

export default userSlice.reducer
export const {handleModalSignUp} = userSlice.actions