import { createSlice, configureStore } from '@reduxjs/toolkit'

export interface user {
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
    users: user[],
    search: string
}

const initialState: initialState = {
    users: [],
    search: ""
}

const userSlice = createSlice({
    name: 'infor',
    initialState,
    reducers: {
        listUser: (state, action) => {
            state.users = action.payload
        },
        addUser: state => {
            
        }
    }
})

export const { listUser, addUser } = userSlice.actions

export default userSlice.reducer