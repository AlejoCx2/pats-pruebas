import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: {
        name: "",
    }
}

const selectedSubOptionSlice = createSlice({
    name: "selectedSubOption",
    initialState,
    reducers: {
        setSelectedSubOption: (state, action) => {
            state.value = action.payload
        },
        cleanSelectedSubOption: (state) => {
            state.value = initialState
        }
    },
})

export const { setSelectedSubOption, cleanSelectedSubOption } = selectedSubOptionSlice.actions

export default selectedSubOptionSlice.reducer;