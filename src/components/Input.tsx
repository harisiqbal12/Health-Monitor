import { View, Text, TextInput } from 'react-native';

import type { InputProps } from './types';

export default function Input({
	label,
	icon,
	...props
}: InputProps): JSX.Element {
	return (
		<View className='flex flex-col gap-2'>
			<Text className='font-semibold text-gray-500 text-xs'>{label}</Text>
			<View className='w-full h-14 rounded-md bg-white px-4 flex flex-row items-center'>
				{icon && icon}
				<TextInput
					className={`w-full h-full text-xs font-medium text-gray-500 ${
						icon ? 'ml-2' : 'ml-0'
					}`}
					cursorColor='#2b2d42'
					{...props}
				/>
			</View>
		</View>
	);
}
