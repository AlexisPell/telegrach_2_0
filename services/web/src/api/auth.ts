import axios from 'axios';
import { environment } from '../constants/env';
import { IUser } from '../interfaces/user';

const getMe = async () => {
	const me = await axios.get<IUser>(`${environment.api}/auth/me`, { withCredentials: true });
	return me;
};

export type AuthPayload = { email: string; password: string };
const register = async (payload: AuthPayload) => {
	const res = await axios.post<IUser>(`${environment.api}/auth/register`, payload, {
		withCredentials: true,
	});
	console.log('REGISTER PAYLOAD', res);
	return res;
};

const login = async (payload: AuthPayload) => {
	const res = await axios.post<IUser>(`${environment.api}/auth/login`, payload, {
		withCredentials: true,
	});
	console.log('REGISTER PAYLOAD', res);
	return res;
};

const googleLogin = async () => {
	const res = await axios.get(`${environment.api}/auth/google/login`, {
		withCredentials: true,
	});
	return res;
};

export const authApi = { getMe, register, login, googleLogin };
