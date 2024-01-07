import { View, Text, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';

export default function Patient({
	onPress,
}: {
	onPress: () => void;
}): JSX.Element {
	const [focus, setFocus] = useState(false);

	const handleFocus = () => setFocus(true);
	const handleBlur = () => setFocus(false);

	return (
		<TouchableHighlight
			underlayColor=''
			activeOpacity={1}
			onPressIn={handleFocus}
			onPressOut={handleBlur}
			onPress={onPress}>
			<View
				className={`w-full h-32 rounded-xl flex flex-row items-center px-6 justify-between mb-3 ${
					focus ? 'bg-[#ef233c]' : 'bg-white'
				}`}>
				<View className='flex flex-row items-center  h-full'>
					<View
						className={`w-16 h-16 rounded-full ${
							focus ? 'bg-white' : 'bg-[#ef233c]'
						} flex items-center justify-center`}>
						<FontAwesome
							name='male'
							size={24}
							color={focus ? '#ef233c' : 'white'}
						/>
					</View>
					<View className='h-full flex flex-col justify-center ml-4'>
						<View
							className={`px-2 h-6 rounded-md ${
								focus ? 'bg-white' : 'bg-[#ef233c]'
							} flex items-start justify-center`}>
							<Text
								className={`text-sx font-bold ${
									focus ? 'text-[#ef233c]' : 'text-white'
								} `}>
								{new Date().toDateString()}
							</Text>
						</View>
						<View className='flex flex-col'>
							<Text
								className={`text-2xl font-bold ${
									focus ? 'text-white' : 'text-gray-600'
								}`}>
								Harris Iqbal
							</Text>
							<Text
								className={`text-sx font-bold ${
									focus ? 'text-white' : 'text-gray-600'
								}`}>
								+92 (344-8112277)
							</Text>
						</View>
					</View>
				</View>
				<View className='h-full flex flex-col justify-between py-4 items-end'>
					<View
						className={`px-2 h-6 rounded-md ${
							focus ? 'bg-white' : 'bg-[#ef233c]'
						} flex items-center justify-center`}>
						<Text
							className={`text-sx font-bold ${
								focus ? 'text-[#ef233c]' : 'text-white'
							}`}>
							A+
						</Text>
					</View>
					<Entypo
						name='dots-three-horizontal'
						size={24}
						color={focus ? 'white' : 'black'}
					/>
				</View>
			</View>
		</TouchableHighlight>
	);
}
