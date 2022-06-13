import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    value :{
        modalComment : false,
    }
}
const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        handleModalComment : (state, payload)=>{

        },
        handleAddPost : (state, payload)=>{

        }
    }
})

export const {handleModalComment,handleAddPost} = postSlice.actions
export default postSlice.reducer