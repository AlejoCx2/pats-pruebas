import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: {
        name: "",
    }
}

const selectedOptionSlice = createSlice({
    name: "selectedOption",
    initialState,
    reducers: {
        setSelectedOption: (state, action) => {
            state.value = action.payload
        },
        cleanSelectedOption: (state) => {
            state.value = initialState
        }
    },
})

export const { setSelectedOption, cleanSelectedOption } = selectedOptionSlice.actions

export default selectedOptionSlice.reducer;