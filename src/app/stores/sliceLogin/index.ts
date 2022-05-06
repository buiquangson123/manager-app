import { createSlice } from '@reduxjs/toolkit'
import { user } from '../sliceMemberInfor'

interface initialState {
    account: user,
}

const initialState: initialState = {
    account: {} as user,
}

const sliceLogin = createSlice({
    name: 'account',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.account = action.payload
        },
        
    }
})

export const { getUser } = sliceLogin.actions

export default sliceLogin.reducer