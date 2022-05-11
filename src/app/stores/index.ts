import { configureStore } from '@reduxjs/toolkit'
import sliceMemberInfor, { user } from './sliceMemberInfor/index'
import sliceLogin from './sliceLogin/index'

export const store = configureStore({
    reducer: {
        infor: sliceMemberInfor,
        login: sliceLogin
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch