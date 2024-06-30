// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const handleGetLiveLocations = createAsyncThunk(
//     "server/handleGetLiveLocations",
//     async(_, thunkAPI) => {
//         try {
//             const result = await axios.get("http://localhost:5000/api/coordinates/latest")
//             if(result) {
//                 result?.data?.map((coords) => {
//                     return {
//                         lat: coords?.latitude,
//                         lng: coords?.longitude,
//                         timestamp: new Date(coords?.timestamp)
//                     }
//                 })
//             } else {
//                 return null;
//             }
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// )


// const serverSlice = createSlice({
//     name: "server",
//     initialState: {
//         data: null,
//         isLoading: false,
//         error: null,
//         isError: false,
//     },
//     extraReducers: (builder) => {
//         builder.addCase(handleGetLiveLocations.pending, (state) => {
//             state.isLoading = true;
//         })
//         builder.addCase(handleGetLiveLocations.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.data = action.payload;
//         })
//         builder.addCase(handleGetLiveLocations.rejected, (state, action) => {
//             state.isLoading = false;
//             state.data = null;
//             state.isError = true;
//             state.error = action.payload;
//         })
//     }
// })

// export default serverSlice.reducer;