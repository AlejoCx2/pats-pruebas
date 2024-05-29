import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: false
}

const isOpenSlice = createSlice({
    name: "isOpen",
    initialState,
    reducers: {
        changeValue: (state) => {
            state.value = !state.value
        },
        cleanIsOpen: (state) => {
            state.value = false
        },
    },
})

export const { changeValue, cleanIsOpen } = isOpenSlice.actions

export default isOpenSlice.reducer;