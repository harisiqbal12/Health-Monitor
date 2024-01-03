import { View, Text } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import SafeAreaView from '../../providers/SafeAreaView';
import { Button, Input } from '../../components';

export default function Login(): JSX.Element {
	return (
		<SafeAreaView backgroundColor='#ef233c'>
			<View className='w-full h-full bg-[#edf2f4] flex flex-col relative'>
				<View className='w-full h-[50%] bg-[#ef233c] rounded-b-[40px] px-10 flex flex-col justify-center'>
					<View className='flex flex-col '>
						<Text className='text-white font-black text-[40px]'>
							Welcome Back :)
						</Text>
						<Text className='text-sx text-white font-semibold'>
							Login to your account
						</Text>
					</View>
				</View>
				<View className='w-full h-[50%] flex flex-col px-6 py-10'>
					<Input
						label='Email'
						placeholder='Enter your email'
						keyboardType='email-address'
						returnKeyType='next'
						autoCapitalize='none'
						icon={
							<MaterialCommunityIcons name='email' size={24} color='#6b7280' />
						}
					/>
					<View className='my-2' />
					<Input
						label='Password'
						placeholder='***********'
						textContentType='password'
						secureTextEntry
						returnKeyType='send'
						autoCapitalize='none'
						icon={
							<MaterialCommunityIcons
								name='form-textbox-password'
								size={24}
								color='#6b7280'
							/>
						}
					/>
					<View className='my-4' />
					<Button title='Login'>
						<MaterialIcons name='arrow-forward-ios' size={20} color='#fff' />
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
}
