import { View, Text } from 'react-native';

import { SafeAreaView } from '../../providers';
import type { AppScreenProps } from '../../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppScreenProps, 'Patient'>;

export default function Patient({}: Props): JSX.Element {
	return (
		<SafeAreaView backgroundColor='#edf2f4'>
			<View className='w-full h-full flex flex-col px-4'>
				<Text>Patient Detail</Text>
			</View>
		</SafeAreaView>
	);
}
