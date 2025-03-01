// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { checkIsAuth, fetchLogin } from 'store/reducers/slices/authSlice/asyncThunks'
//
// interface userInitialState {
//     isAuth: boolean
// }
//
// const initialState: userInitialState = {
//     isAuth: false,
// }
//
// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setAuth: (state, action: PayloadAction<boolean>) => {
//             state.isAuth = action.payload
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchLogin.fulfilled, (state) => {
//                 state.isAuth = true
//             })
//             .addCase(checkIsAuth.fulfilled, (state) => {
//                 state.isAuth = true
//             })
//             .addCase(checkIsAuth.rejected, (state) => {
//                 state.isAuth = false
//             })
//     },
// })
//
// export const { setAuth } = authSlice.actions
