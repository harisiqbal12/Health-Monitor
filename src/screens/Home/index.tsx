import { useCallback, useEffect } from 'react';
import { View, Text, FlatList, ListRenderItem } from 'react-native';

import { useLazyFetch } from '../../hooks';
import { Patient } from '../../components';
import { SafeAreaView } from '../../providers';
import { api } from '../../common';

import type { CurrentPatientsData, AppScreenProps } from '../../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppScreenProps, 'Home'>;

export default function Home({ navigation }: Props): JSX.Element {
	const [loading, error, handleFetch, data] = useLazyFetch<{
		items: Array<CurrentPatientsData>;
	}>();

	const headers = new Headers();

	const onFetch = useCallback(() => {
		handleFetch({
			api: api.CURRENTPATIENTS,
			method: 'GET',
			headers,
			authentication: true,
		});
	}, []);

	useEffect(() => {
		onFetch();
	}, []);

	const navigatePatientDetail = (id: number) => {
		navigation.navigate('Patient', {
			patientId: id,
		});
	};

	const renderItem: ListRenderItem<CurrentPatientsData> = ({ item, index }) => {
		return <Patient onPress={() => navigatePatientDetail(item?.id)} {...item} />;
	};

	return (
		<SafeAreaView backgroundColor='#edf2f4'>
			<View className='w-full h-full flex flex-col px-4'>
				<View className='w-full flex flex-col py-5 pb-10'>
					<Text className='font-bold text-3xl text-gray-700'>Patients</Text>
					<Text className='font-bold text-sx text-gray-700'>
						All yours patients.
					</Text>
				</View>

				<FlatList
					data={data?.items}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					onRefresh={onFetch}
					refreshing={loading}
				/>
			</View>
		</SafeAreaView>
	);
}
