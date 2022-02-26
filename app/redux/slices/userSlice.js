import { createSlice } from '@reduxjs/toolkit';
const initData = {
    _id: null,
    name: '',
    avatar: '',
    providerType: ''
};
export const userSlice = createSlice({
    name: 'user',
    initialState: initData,
    reducers: {
        updateCurrentUser: (state, value) => {
            state.value = {
                ...value.payload
            };
        },
        clearCurrentUser: (state) => {
            state.value = initData;
        }
    }
});

// Action creators are generated for each case reducer function
export const { updateCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
