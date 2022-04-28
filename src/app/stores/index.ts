import { configureStore } from '@reduxjs/toolkit'
import userReducer from './infor/index'

export const store = configureStore({
    reducer: {
        infor: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>