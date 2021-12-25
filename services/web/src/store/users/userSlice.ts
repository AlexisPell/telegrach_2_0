import { IUser } from '../../interfaces/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userActions } from './userActionCreators';

interface UserState {
	users: IUser[];
	isLoading: boolean;
	error: string;
}
const initialState: UserState = {
	users: [],
	isLoading: false,
	error: '',
};

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
			state.users = payload;
		},
	},
	extraReducers: {
		[userActions.fetchUsers.fulfilled.type]: (state, { payload }: PayloadAction<IUser[]>) => {
			state.users = payload;
			state.isLoading = false;
		},
		[userActions.fetchUsers.pending.type]: (state) => {
			state.isLoading = true;
		},
		[userActions.fetchUsers.rejected.type]: (state, { payload }: PayloadAction<string>) => {
			state.error = payload;
			state.isLoading = false;
		},
	},
});

export default userSlice.reducer;
