import React from 'react';
import { ITab } from '../../../typings/tabs';

interface TabsProps {
	tabs: ITab[];
}
export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
	return (
		<div className='p-1 flex flex-row justify-start align-middle bg-gray-800 w-full'>
			{tabs.map((tab) => (
				<Tab tab={tab} />
			))}
		</div>
	);
};

interface TabProps {
	tab: ITab;
}
const Tab: React.FC<TabProps> = ({ tab }) => {
	return (
		<div className='relative mr-1 pb-1 hover:bg-purple-400 p-1 rounded-md transition-all hover:bg-opacity-10'>
			<span className='text-gray-400 font-medium'>{tab.text}</span>
			<span>{tab.notificationsCount || null}</span>
			<div
				className='-bottom-1 left-1 right-1 absolute bg-purple-400 rounded-t-xl'
				style={{ height: '3px' }}
			/>
		</div>
	);
};
