import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import isOpenReducer from "./sideBar/isOpenSlice";
import selectedOptionReducer from "./sideBar/selectedOptionSlice"
import selectedSubOptionReducer from "./sideBar/selectedSubOptionSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        isOpen: isOpenReducer,
        selectedOption: selectedOptionReducer,
        selectedSubOption: selectedSubOptionReducer
    },
})