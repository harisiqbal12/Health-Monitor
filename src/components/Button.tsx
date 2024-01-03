import { TouchableHighlight, Text, View } from 'react-native';

import type { ButtonProps } from './types';

export default function Button({
	title,
	loading,
	children,
}: ButtonProps): JSX.Element {
	return (
		<TouchableHighlight
			underlayColor=''
			activeOpacity={0.5}
			className='w-full h-14 rounded-md bg-[#ef233c] flex items-center justify-center'>
			<View className='w-full flex flex-row items-center justify-between px-6' >
				<Text className='text-white font-bold text-md'>{title}</Text>
				{children}
			</View>
		</TouchableHighlight>
	);
}
