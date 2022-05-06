import { configureStore } from '@reduxjs/toolkit'
import sliceMemberInfor from './sliceMemberInfor/index'
import sliceLogin from './sliceLogin/index'

export const store = configureStore({
    reducer: {
        infor: sliceMemberInfor,
        login: sliceLogin
    }
})