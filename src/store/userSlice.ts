import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  status: "idle",
};

// Thunk to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterUsers: (state, action: PayloadAction<Partial<User>>) => {
      state.filteredUsers = state.users.filter((user) =>
        Object.entries(action.payload).every(([key, value]) =>
          user[key as keyof User]
            ?.toString()
            .toLowerCase()
            .includes(value?.toString().toLowerCase() || "")
        )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { filterUsers } = userSlice.actions;

export default userSlice.reducer;
