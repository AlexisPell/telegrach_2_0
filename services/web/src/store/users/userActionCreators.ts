import axios from 'axios';
import { IUser } from '../../interfaces/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchUsers = createAsyncThunk('user/fetchingAll', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue('Error during users list loading');
	}
});

export const userActions = {
	fetchUsers,
};
