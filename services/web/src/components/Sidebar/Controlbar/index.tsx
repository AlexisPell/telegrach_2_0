import React from 'react';
import { HamburgerIcon } from '../../../elements/icons/Hamburger';
import { Input } from '../../../elements/interactors/Input';

interface ControlbarProps {}

export const Controlbar: React.FC<ControlbarProps> = ({}) => {
	return (
		<div className='p-2 flex flex-row justify-start align-middle bg-gray-800'>
			<HamburgerIcon />
			<div className='ml-3 pt-1.5 w-full'>
				<Input />
			</div>
		</div>
	);
};
