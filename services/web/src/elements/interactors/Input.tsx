import React, { useRef, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useFocusWithin } from 'ahooks';

interface InputProps {}

export const Input: React.FC<InputProps> = ({}) => {
	const ref = useRef();
	const isFocused = useFocusWithin(ref, {
		onFocus: () => {},
		onBlur: () => {},
	});
	return (
		<div className='h-8 w-full relative'>
			<GoSearch className='absolute left-2 top-2 text-gray-400' style={{ fontSize: '18px' }} />
			<input
				ref={ref as any}
				type='text'
				className={`h-8 self-center bg-gray-900 rounded-xl w-full pl-8 border-2 border-gray-800 
				hover:border-gray-700 transition-all
        ${isFocused && 'border-purple-500'}
        `}
				placeholder='Search'
				style={{ color: '#fff', fontSize: '18px' }}
			/>
		</div>
	);
};
