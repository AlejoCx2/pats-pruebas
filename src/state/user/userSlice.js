import { createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"

const refreshFetch = async () => {
    try {
        const res = await fetch(import.meta.env.VITE_API_URL + "api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: localStorage.getItem('refresh') }),
        });

        if (res.status === 200) {
            const data = await res.json();
            localStorage.setItem('access', data.access);
            const userInfo = {
                auth: true,
                name: jwtDecode(data.access).name,
                roles: jwtDecode(data.access).roles,
                permissions: jwtDecode(data.access).permissions,
                jwt_access: data.access,
            };
            return userInfo;
        } else {
            localStorage.clear();
            return { auth: false };
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        localStorage.clear();
        return { auth: false };
    }
};

const initialState = {
    value: localStorage.getItem('access') ? await refreshFetch() : {
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
        },
    },
})

export const { setUser, cleanUser } = userSlice.actions

export const updateUserAsync = () => async dispatch => {
    console.log("Refreshing Token");
    const updatedUser = await refreshFetch();
    dispatch(setUser(updatedUser));
};

export default userSlice.reducer;