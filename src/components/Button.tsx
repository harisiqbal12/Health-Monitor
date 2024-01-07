import { TouchableHighlight, Text, View, ActivityIndicator } from 'react-native';

import type { ButtonProps } from './types';

export default function Button({
	title,
	loading,
	children,
	onPress,
}: ButtonProps): JSX.Element {
	return (
		<TouchableHighlight
			underlayColor=''
			activeOpacity={0.5}
			onPress={onPress}
			className='w-full h-14 rounded-md bg-[#ef233c] flex items-center justify-center'>
			{loading ? (
				<View>
					<ActivityIndicator color='#fff' size={32} />
				</View>
			) : (
				<View className='w-full flex flex-row items-center justify-between px-6'>
					<Text className='text-white font-bold text-md'>{title}</Text>
					{children}
				</View>
			)}
		</TouchableHighlight>
	);
}
