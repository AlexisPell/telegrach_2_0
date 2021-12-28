import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi, AuthPayload } from '../../api/auth';
import router from 'next/router';

const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
	try {
		const { data } = await authApi.getMe();
		if (!data) {
			router.push('/login');
		}
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
