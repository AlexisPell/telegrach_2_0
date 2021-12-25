import React, { useState, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiLogIn } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Button, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../src/hooks/useRedux';
import { authAsyncActions } from '../../src/store/auth/authActionCreators';
import { isValidEmail } from '../../src/utils/isValidEmail';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {},
	};
};
interface Credentials {
	email: string;
	password: string;
	confirmPassword: string;
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
		confirmPassword: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		confirmation: '',
	});

	const onChangeHandler = (e: any) => {
		const { name, value }: { name: 'email' | 'password' | 'confirmPassword'; value: string } =
			e.target;
		console.log('creds: ', credentials);
		if (name === 'confirmPassword') {
			if (value !== credentials.password) {
				setErrors((e) => ({ ...e, confirmation: 'Passwords do not match' }));
			} else {
				setErrors((e) => ({ ...e, confirmation: '' }));
			}
		}
		if (name === 'email') {
			if (!isValidEmail(value)) {
				setErrors((e) => ({ ...e, email: 'Email is invalid' }));
			} else {
				setErrors((e) => ({ ...e, email: '' }));
			}
		}
		if (name === 'password') {
			if (value !== credentials.confirmPassword) {
				setErrors((e) => ({ ...e, confirmation: 'Passwords do not match' }));
			} else {
				setErrors((e) => ({ ...e, confirmation: '' }));
			}
			if (value.length <= 5) {
				setErrors((e) => ({ ...e, password: "Password's length must be at least 6 characters" }));
			} else {
				setErrors((e) => ({ ...e, password: '' }));
			}
		}
		setCredentials((c) => ({ ...c, [e.target.name]: e.target.value }));
	};

	const signUpHandler = ({ email, password }: Credentials) => {
		dispatch(authAsyncActions.register({ email, password }));
		dispatch(authAsyncActions.getMe());
		if (!error) {
			router.push('/');
		}
	};

	return (
		<>
			<Head>
				<title>Telegrach | Register</title>
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
					<TextField
						className='w-full'
						value={credentials.confirmPassword}
						onChange={onChangeHandler}
						label='Confirm password'
						name='confirmPassword'
						variant='outlined'
					/>
					<div className='mb-4' />
					<Tip showError={!!errors.email} text={errors.email} />
					<Tip showError={!!errors.password} text={errors.password} />
					<Tip showError={!!errors.confirmation} text={errors.confirmation} />
					<Tip showError={!!error} text={error} />
					<Button
						className='flex justify-center w-full'
						variant='text'
						onClick={() => signUpHandler(credentials)}
					>
						<FiLogIn style={{ fontSize: '28px', marginRight: '10px' }} />
						<span>Sign up</span>
					</Button>
					<div
						className='mt-4 cursor-pointer hover:text-gray-500'
						onClick={() => router.push('/login')}
					>
						Already have an account? Click here
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
