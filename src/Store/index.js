import {configureStore} from '@reduxjs/toolkit'
import expenSlice from './expenSlice';
import authSlice from './authSlice'
const store = configureStore({
    reducer:{
        auth:authSlice,
        expenses:expenSlice,
    }
})
export default store;