import { IUser } from '../../interfaces/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAsyncActions } from './authActionCreators';

interface AuthState {
	user: IUser | null;
	isLoading: boolean;
	isAuthorized: boolean;
	error: string;
}
const initialState: AuthState = {
	user: null,
	isLoading: false,
	isAuthorized: false,
	error: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<IUser>) => {
			state.user = payload;
		},
	},
	extraReducers: {
		// GET ME
		[authAsyncActions.getMe.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
			if (payload) {
				state.user = payload;
				state.isAuthorized = true;
				state.isLoading = false;
				state.error = '';
			}
			if (!payload) {
				state.user = null;
				state.isAuthorized = false;
				state.isLoading = false;
				state.error = '';
			}
		},
		[authAsyncActions.getMe.pending.type]: (state) => {
			state.isLoading = true;
		},
		[authAsyncActions.getMe.rejected.type]: (state, { payload }: PayloadAction<string>) => {
			state.error = payload;
			state.isLoading = false;
			state.isAuthorized = false;
		},
		// REGISTER
		[authAsyncActions.register.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
			state.user = payload;
			state.isAuthorized = true;
			state.isLoading = false;
			state.error = '';
		},
		[authAsyncActions.register.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},
		[authAsyncActions.register.rejected.type]: (state, { payload }: PayloadAction<string>) => {
			state.error = payload;
			state.isLoading = false;
			state.isAuthorized = false;
		},
		// LOGIN
		[authAsyncActions.login.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
			state.user = payload;
			state.isAuthorized = true;
			state.isLoading = false;
			state.error = '';
		},
		[authAsyncActions.login.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},
		[authAsyncActions.login.rejected.type]: (state, { payload }: PayloadAction<string>) => {
			state.error = payload;
			state.isLoading = false;
			state.isAuthorized = false;
		},
	},
});

export default authSlice.reducer;
