import { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import type { CurrentPatientsData } from '../types';

interface Props extends CurrentPatientsData {
	onPress: () => void;
}

export default function Patient({ onPress, ...item }: Props): JSX.Element {
	const [focus, setFocus] = useState(false);

	const handleFocus = () => setFocus(true);
	const handleBlur = () => setFocus(false);

	const renderGender = {
		male: (
			<FontAwesome name='male' size={24} color={focus ? '#ef233c' : 'white'} />
		),
		female: (
			<FontAwesome name='female' size={24} color={focus ? '#ef233c' : 'white'} />
		),
		rather_not_say: (
			<FontAwesome5
				name='question'
				size={24}
				color={focus ? '#ef233c' : 'white'}
			/>
		),
	};

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
						{renderGender[item?.gender]}
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
								{new Date(item?.created_at).toDateString()}
							</Text>
						</View>
						<View className='flex flex-col'>
							<Text
								className={`text-2xl font-bold ${
									focus ? 'text-white' : 'text-gray-600'
								}`}>
								{item?.name}
							</Text>
							<Text
								className={`text-sx font-bold ${
									focus ? 'text-white' : 'text-gray-600'
								}`}>
								{item?.additional_details?.phone}
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
							{item?.additional_details.blood_group}
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
