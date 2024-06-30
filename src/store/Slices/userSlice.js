import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { setDoc, collection, addDoc } from "firebase/firestore";
import { app, fireStore } from "../../utils/Firebase";

const auth = getAuth();

export const handleSignUpUser = createAsyncThunk(
  "user/handleSignUpUser",
  async ({ email, fullName, password, phone }, thunkAPI) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials?.user;

      if (userCredentials) {
        const newDoc = await addDoc(collection(fireStore, "users"), {
          fullName: fullName,
          email: user?.email,
          phone: phone,
          uid: user?.uid,
          type: "patient"
        });
        if (!newDoc) {
          return new Error("error while saving new doc in users");
        }
        return {
            user: {
                id: newDoc?.id,
                fullName: fullName,
                email: email,
                phone: phone,
                type: "patient",
            }
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const handleSignUpUserDriver = createAsyncThunk(
  "user/handleSignUpUserDriver",
  async ({ email, fullName, password, phone, model, number }, thunkAPI) => {
    try {
      const driverCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const driver = driverCredentials?.user;

      if (driverCredentials) {
        const newDoc = await addDoc(collection(fireStore, "drivers"), {
          fullName: fullName,
          email: driver?.email,
          phone: phone,
          carModel: model,
          carNumber: number,
          uid: driver?.uid,
          type: "drivers"
        });
        if (!newDoc) {
          return new Error("error while saving new doc in users");
        }
        return {
            user: {
                id: newDoc?.id,
                fullName: fullName,
                email: email,
                phone: phone,
                carModel: model,
                carNumber: number,
                type: "driver",
            }
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const handleSignUpUserHospital = createAsyncThunk(
  "user/handleSignUpUserHospital",
  async ({ email, password, name }, thunkAPI) => {
    try {
      const hospitalCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const hospital = hospitalCredentials?.user;

      if (hospitalCredentials) {
        const newDoc = await addDoc(collection(fireStore, "hospitals"), {
          uid: hospital?.uid,
          email: hospital?.email,
          name: name,
          type: "hospitals",
        });
        if (!newDoc) {
          return new Error("error while saving new doc in users");
        }
        return {
            user: {
                id: newDoc?.id,
                name: name,
                email: hospital?.email,
                type: "hospitals",
            }
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const handleSignInUser = createAsyncThunk(
  "user/handleSignInUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if(userCredentials) {
        const user = userCredentials?.user;
        return user;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const handleSignOut = createAsyncThunk(
    "user/handleSignOut",
    async(_, thunkAPI) => {
        try {
            await signOut(auth);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    error: null,
    isLoading: false,
    isError: false,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleSignUpUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleSignUpUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(handleSignUpUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isError = true;
    });
    builder.addCase(handleSignUpUserDriver.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleSignUpUserDriver.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(handleSignUpUserDriver.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isError = true;
    });
    builder.addCase(handleSignOut.pending, (state) => {
        state.isLoading = true;
    })
    builder.addCase(handleSignOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = null;
    })
    builder.addCase(handleSignOut.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
    })
    builder.addCase(handleSignInUser.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(handleSignInUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload
    })
    builder.addCase(handleSignInUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload;
      state.isError = true;
    })
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
