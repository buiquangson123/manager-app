import { createSlice } from '@reduxjs/toolkit'

export interface authen {
    id: number,
    name: string,
    age: number,
    email: string,
    password: string,
    telephone: string,
    address: string,
    departId: Number[],
    role: string
}

interface initialState {
    authen: authen,
}

const initialState: initialState = {
    authen: {} as authen,
}

const userSliceAuthen = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.authen = action.payload
        },
        
    }
})

export const { getUser } = userSliceAuthen.actions

export default userSliceAuthen.reducer