import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async () => {
	// const res = await fetch('https://penis');
	// const penis: string = await res.json();
	const penis = 'hyi';
	return {
		props: {
			penis,
		},
	};
};

interface PenisesPageProps {
	penis?: string;
}
const PenisesPage: NextPage<PenisesPageProps> = ({ penis }) => {
	return (
		<>
			<Head>
				<title>Telegrach | Penises</title>
			</Head>
			<section>
				<div className='text-xl text-center text-blue-400'>Hello penises</div>
			</section>
		</>
	);
};

export default PenisesPage;
