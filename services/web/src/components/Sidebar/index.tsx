import React from 'react';
import { ITab } from '../../typings/tabs';
import { Controlbar } from './Controlbar';
import { Tabs } from './Tabs';

const tabsData: ITab[] = [
	{ text: 'Personal', notificationsCount: 0 },
	{ text: 'Noveo', notificationsCount: 3 },
	{ text: 'Memes', notificationsCount: 5 },
];

interface SidebarProps {}
export const Sidebar: React.FC<SidebarProps> = ({}) => {
	return (
		<div className='w-full h-full sm:w-96 bg-gray-700 flex flex-col'>
			<Controlbar />
			<Tabs tabs={tabsData} />
		</div>
	);
};
