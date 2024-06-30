import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./Slices/userSlice"
// import serverSlice from "./Slices/serverSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        // server: serverSlice,
    }
})

export default store;