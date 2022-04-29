import { configureStore } from '@reduxjs/toolkit'
import inforReducer from './infor/index'
import authenReducer from './authen/index'

export const store = configureStore({
    reducer: {
        infor: inforReducer,
        authen: authenReducer
    }
})

export type RootState = ReturnType<typeof store.getState>