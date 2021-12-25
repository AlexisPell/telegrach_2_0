import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi, AuthPayload } from '../../api/auth';

const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
	try {
		const { data } = await authApi.getMe();
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue('Error during fetching me info');
	}
});

const register = createAsyncThunk<any, AuthPayload>('auth/register', async (payload, thunkAPI) => {
	try {
		const { data } = await authApi.register(payload);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue('Registration failed.');
	}
});

const login = createAsyncThunk<any, AuthPayload>('auth/register', async (payload, thunkAPI) => {
	try {
		const { data } = await authApi.login(payload);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue('Login failed.');
	}
});

export const authAsyncActions = {
	getMe,
	register,
	login,
};
