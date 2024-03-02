import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    token:'',
    authentication:false,
}
const authSlice = createSlice({
   name:'auth',
   initialState,
   reducers:{
       isLogin:(state,action)=>{
          state.authentication=!state.authentication
          state.token=action.payload
       },
       isLogout:(state,action)=>{
        state.authentication=!state.authentication
        state.token=''
       }
   }
})
export default authSlice.reducer;
export const {isLogin,isLogout} = authSlice.actions;