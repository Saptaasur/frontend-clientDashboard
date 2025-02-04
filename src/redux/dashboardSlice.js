import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    tasks: [],
    project: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const { setTasks, setProject } = dashboardSlice.actions;

export default dashboardSlice.reducer;
