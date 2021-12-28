import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

interface HamburgerProps {}

export const HamburgerIcon: React.FC<HamburgerProps> = ({}) => {
	return (
		<div className='rounded-full bg-none flex justify-center align-middle w-11 h-11 pt-2 pr-0.5 hover:bg-gray-600 cursor-pointer transition-all'>
			<GiHamburgerMenu style={{ fontSize: '28px' }} className='text-gray-400' />
		</div>
	);
};
