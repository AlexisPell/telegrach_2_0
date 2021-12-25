import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
	};
};

interface SignInPageProps {
	penis: string;
}
const SignInPage: NextPage<SignInPageProps> = ({ penis }) => {
	return (
		<>
			<Head>
				<title>Telegrach | Sign in</title>
			</Head>
			<section>
				<div className='text-xl text-center text-blue-400'>Hello world</div>
			</section>
		</>
	);
};

export default SignInPage;
