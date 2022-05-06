import { createSlice } from '@reduxjs/toolkit'

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

const sliceMemberInfor = createSlice({
    name: 'infor',
    initialState,
    reducers: {
        updateStateUser: (state, action) => {
            state.users = action.payload
        },
        addStateUser: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((item) => item.id !== action.payload)
        },
        updateEditUser: (state, action) => {
            const statePrev = [...state.users];
            const stateNew = statePrev.map((item) =>
                item.id === action.payload.id ? (item = { ...item, ...action.payload }) : item
            );
            state.users = stateNew
        },
        filterUser: (state, action) => {
            state.users = action.payload
        }
    }
})

export const { updateStateUser, addStateUser, deleteUser, updateEditUser, filterUser } = sliceMemberInfor.actions

export default sliceMemberInfor.reducer