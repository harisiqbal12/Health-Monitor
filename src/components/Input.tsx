import { View, Text, TextInput } from 'react-native';

import type { InputProps } from './types';
import { useState } from 'react';

export default function Input({
	label,
	icon,
	error,
	errorMessage,
	...props
}: InputProps): JSX.Element {
	const [focus, setFocus] = useState(false);

	const handleFocus = () => setFocus(true);
	const handleBlur = () => setFocus(false);

	return (
		<View className='flex flex-col gap-2'>
			<Text className='font-semibold text-gray-500 text-xs'>{label}</Text>
			<View
				className={`w-full h-14 rounded-md bg-white px-4 flex  flex-row items-center border ${
					error
						? 'border-rose-500'
						: `${focus ? 'border-gray-500' : 'border-transparent'}`
				}`}>
				{icon && icon}
				<TextInput
					className={`w-full h-full text-xs font-medium text-gray-500 ${
						icon ? 'ml-2' : 'ml-0'
					}`}
					cursorColor='#2b2d42'
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
				/>
			</View>
		</View>
	);
}
