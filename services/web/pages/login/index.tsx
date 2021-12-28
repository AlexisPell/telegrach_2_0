import React, { useState, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FiLogIn } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';
import { Button, Chip, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../src/hooks/useRedux';
import { authAsyncActions } from '../../src/store/auth/authActionCreators';
import { isValidEmail } from '../../src/utils/isValidEmail';
import { AiFillCloseCircle } from 'react-icons/ai';
import { authApi } from '../../src/api/auth';
import { environment } from '../../src/constants/env';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {},
	};
};
interface Credentials {
	email: string;
	password: string;
}

interface LoginPageProps {}
const LoginPage: NextPage<LoginPageProps> = ({}) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const isAuthorized = useAppSelector((state) => state.authReducer.isAuthorized);
	const error = useAppSelector((state) => state.authReducer.error);

	useEffect(() => {
		if (isAuthorized) {
			router.push('/');
		}
	}, [isAuthorized]);

	const [credentials, setCredentials] = useState<Credentials>({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const onChangeHandler = (e: any) => {
		console.log('creds: ', credentials);
		const { name, value }: { name: 'email' | 'password'; value: string } = e.target;
		if (name === 'email') {
			if (!isValidEmail(value)) {
				setErrors((e) => ({ ...e, email: 'Email is invalid' }));
			} else {
				setErrors((e) => ({ ...e, email: '' }));
			}
		}
		if (name === 'password') {
			if (value.length <= 5) {
				setErrors((e) => ({ ...e, password: "Password's length must be at least 6 characters" }));
			} else {
				setErrors((e) => ({ ...e, password: '' }));
			}
		}
		setCredentials((c) => ({ ...c, [e.target.name]: e.target.value }));
	};

	const signInHandler = (credentials: Credentials) => {
		dispatch(authAsyncActions.login(credentials));
		dispatch(authAsyncActions.getMe());
		if (!error) {
			router.push('/');
		}
	};

	return (
		<>
			<Head>
				<title>Telegrach | Login</title>
			</Head>
			<section className='h-screen w-screen bg-blue-500 flex align-middle'>
				<div className='m-auto md:w-96 w-80 shadow-md bg-white h-auto rounded-xl px-5 py-10 flex flex-col align-middle justify-center'>
					<div className='text-center text-blue-500 text-2xl mb-6 font-bold'>
						Welcome to Telegrach
					</div>
					<TextField
						className='w-full'
						value={credentials.email}
						onChange={onChangeHandler}
						label='Email'
						name='email'
						variant='outlined'
					/>
					<div className='mb-4' />
					<TextField
						className='w-full'
						value={credentials.password}
						onChange={onChangeHandler}
						label='Password'
						name='password'
						variant='outlined'
					/>
					<div className='mb-4' />
					<Tip showError={!!errors.email} text={errors.email} />
					<Tip showError={!!errors.password} text={errors.password} />
					{/* <Tip showError={!!error} text={error} /> */}
					<Button
						className='flex justify-center w-full'
						variant='text'
						onClick={() => signInHandler(credentials)}
					>
						<FiLogIn style={{ fontSize: '28px', marginRight: '10px' }} />
						<span>Sign in</span>
					</Button>
					<div className='mb-4' />
					<Chip label='OR' className='mb-4' />
					<Button
						className='flex justify-start w-full'
						variant='outlined'
						onClick={() => window.open(`${environment.api}/auth/google/login`, '_blank')}
					>
						<FcGoogle className='text-3xl mr-5' /> <span>Sign in with Google</span>
					</Button>
					<div className='mb-4' />
					<Button
						className='flex justify-start w-full'
						variant='outlined'
						onClick={() => window.open(`${environment.api}/auth/discord/login`, '_blank')}
					>
						<FaDiscord className='text-3xl mr-5' /> <span>Sign in with Discord</span>
					</Button>
					<div
						className='mt-4 cursor-pointer hover:text-gray-500'
						onClick={() => router.push('/register')}
					>
						Not registered yet? Click here
					</div>
				</div>
			</section>
		</>
	);
};

export default LoginPage;

const Tip = React.memo<{ text: string; showError: boolean }>(({ text, showError }) => {
	return showError ? (
		<div className='w-full flex justify-start mb-4 align-middle'>
			<div className='mr-3'>
				<AiFillCloseCircle style={{ color: '#f44336', fontSize: '20px' }} />
			</div>
			<div className='text-gray-600'>{text}</div>
		</div>
	) : null;
});
