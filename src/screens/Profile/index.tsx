import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';

import { SafeAreaView } from '../../providers';
import { AppScreenProps } from '../../types';
import { useAuth } from '../../hooks';
import { Button, Input } from '../../components';

type Props = NativeStackScreenProps<AppScreenProps, 'Profile'>;

export default function Profile({ navigation }: Props): JSX.Element {
	const [user, handleLogout] = useAuth();

	return (
		<SafeAreaView backgroundColor='#edf2f4'>
			<View className='w-full h-full flex flex-col px-10 justify-between'>
				<View>
					<View className='w-full mt-10 flex flex-row justify-center mb-10'>
						<View className='w-20 h-20 rounded-full bg-[#ef233c] flex items-center justify-center'>
							<FontAwesome5 name='user-alt' size={32} color='white' />
						</View>
					</View>
					<Input placeholder='User name' label='Name' value={user?.name ?? ''} editable={false} />
					<View className='w-full my-4' />
					<Input placeholder='Email' label='Email' value={user?.email ?? ''} editable={false} />
				</View>
				<View className='mb-14'>
					<Button title='Logout' onPress={handleLogout} />
				</View>
			</View>
		</SafeAreaView>
	);
}
