import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: {
        auth: false,
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        cleanUser: (state) => {
            state.value = initialState
        }
    },
})

export const { setUser, cleanUser } = userSlice.actions

export default userSlice.reducer;