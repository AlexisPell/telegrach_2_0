import { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../src/hooks/useRedux';
import router from 'next/router';
import { authAsyncActions } from '../src/store/auth/authActionCreators';
import { Sidebar } from '../src/components/Sidebar';

export const getServerSideProps: GetServerSideProps = async () => {
	const api = process.env.API;
	return {
		props: { api },
	};
};

const Home: NextPage<{ api: string }> = ({ api }) => {
	const dispatch = useAppDispatch();
	const authState = useAppSelector((state) => state.authReducer);

	useEffect(() => {
		// if (!authState.isAuthorized) {
		// 	router.push('/login');
		// }
		dispatch(authAsyncActions.getMe());

		console.log('PROCESS ENV API:', api);
		console.log('PROCESS ENV API local:', process.env.API);
	}, []);

	return (
		<div className='bg-gray-600 w-screen h-screen'>
			<Head>
				<title>Telegrach</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='w-full h-full'>
				<Sidebar />
				{/* <div className='h-20 w-full bg-blue-400'>
					<Link href='/penises'>To penises!</Link>
				</div> */}
			</main>
		</div>
	);
};

export default Home;
