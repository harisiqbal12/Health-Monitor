import { FontAwesome } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import {
	Animated,
	View,
	Text,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	ScrollView,
} from 'react-native';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart,
} from 'react-native-chart-kit';

import { useLazyFetch } from '../../hooks';

import type { AppScreenProps, CurrentPatientsData } from '../../types';
import { api } from '../../common';

const styles = StyleSheet.create({
	viewAnimated: {
		width: '100%',
	},
	viewContainer: {
		flex: 1,
		padding: 10,
		backgroundColor: '#E5E5E5',
		borderRadius: 20,
	},
});

type Props = NativeStackScreenProps<AppScreenProps, 'Patient'>;

function ModalScreen({ navigation, route }: Props) {
	const animate: any = useRef(new Animated.Value(0)).current;
	const { height } = useWindowDimensions();

	const headers = new Headers();

	const [loading, error, handleFetch, data] = useLazyFetch<CurrentPatientsData>({
		showToast: true,
		vibrateOnError: true,
	});

	useEffect(() => {
		const animation = Animated.timing(animate, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		});

		animation.start();

		return () => {
			animation.reset();
		};
	}, []);

	useEffect(() => {
		handleFetch({
			api: `${api.PATIENTDETAIL}/${route?.params?.patientId}`,
			method: 'GET',
			headers: headers,
			authentication: true,
		});
	}, [route]);

	console.log(data?.history?.map(el => el?.spo2_reading));

	return (
		<View className='w-full items-center justify-center'>
			<Pressable
				style={[
					StyleSheet.absoluteFill,
					{ backgroundColor: 'rgba(0, 0, 0, 0.5)' },
				]}
				onPress={navigation.goBack}
			/>
			<Animated.View
				style={[
					{
						height: height,
						transform: [
							{
								translateY: animate.interpolate({
									inputRange: [0, 1],
									outputRange: [height, height * 0.1],
									extrapolate: 'clamp',
								}),
							},
						],
					},
					styles.viewAnimated,
				]}>
				<View className='flex-1 rounded-3xl bg-[#edf2f4] flex flex-col'>
					<View className='w-full h-60 bg-[#ef233c] rounded-t-3xl flex flex-col items-center justify-center'>
						<View className='p-2 rounded-full bg-rose-400/60'>
							<View className='p-2 rounded-full bg-rose-400'>
								<View className='w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center'>
									<FontAwesome name='male' size={40} color={'#ef233c'} />
								</View>
							</View>
						</View>
						<View className='flex flex-col items-center'>
							<Text className='text-white font-bold text-2xl'>{data?.name}</Text>
							<Text className='text-white text-sx font-bold'>
								{data?.additional_details?.phone}
							</Text>
							<Text className='text-white text-sx font-bold'>{data?.email}</Text>
						</View>
					</View>
					<ScrollView>
						<View className='w-full flex p-4 flex-col'>
							<Text className='uppercase font-bold text-gray-600'>
								PERSONAL INFO
							</Text>
							<View className='w-full flex flex-row items-center mt-4'>
								<View className='w-[33%] h-32 rounded-xl bg-white flex items-center justify-center flex-col'>
									<Text className='text-4xl font-black text-gray-600'>
										{data?.additional_details?.age}
									</Text>
									<Text className='text-xs font-semibold text-gray-400'>Age</Text>
								</View>
								<View className='w-[33%] h-32 rounded-xl bg-white flex items-center justify-center flex-col mx-2'>
									<Text className='text-4xl font-black text-gray-600'>19</Text>
									<Text className='text-xs font-semibold text-gray-400'>BMI</Text>
								</View>
								<View className='w-[31%] h-32 rounded-xl bg-white flex items-center justify-center flex-col'>
									<Text className='text-4xl font-black text-gray-600'>
										{data?.additional_details?.blood_group === 'Unknown'
											? '?'
											: data?.additional_details?.blood_group}
									</Text>
									<Text className='text-xs font-semibold text-gray-400'>
										Blood Group
									</Text>
								</View>
							</View>
						</View>
						<View className='w-full flex flex-col px-4 pb-40'>
							<View className='w-full flex h-60 bg-orange-200 rounded-xl p-4 flex-col '>
								<View className='w-full flex h-full items-center justify-center'>
									{data?.history?.map(el => el?.temp_reading)?.length ? (
										<LineChart
											data={{
												labels: ['', '', '', '', '', '', '', '', '', ''],
												datasets: [
													{
														data: data?.history?.map(el => el?.temp_reading),
													},
												],
												legend: ['Temperature'],
											}}
											width={350}
											height={200}
											verticalLabelRotation={20}
											chartConfig={{
												backgroundColor: '#000000',
												backgroundGradientFrom: '#fb8c00',
												backgroundGradientTo: '#ffa726',
												decimalPlaces: 2, // optional, defaults to 2dp
												color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
												labelColor: (opacity = 1) =>
													`rgba(255, 255, 255, ${opacity})`,
												style: {
													borderRadius: 100,
												},
											}}
											bezier
											style={{
												borderRadius: 10,
											}}
										/>
									) : (
										<></>
									)}
								</View>
							</View>
							<View className='w-full flex h-60 bg-rose-200 rounded-xl mt-4 p-4 items-center justify-center'>
								{data?.history?.map(el => el?.heartbeat_reading)?.length ? (
									<LineChart
										data={{
											labels: ['', '', '', '', '', '', '', '', '', ''],
											datasets: [
												{
													data: data?.history?.map(el => el?.heartbeat_reading),
												},
											],
											legend: ['Heart Beat'],
										}}
										width={350}
										height={200}
										verticalLabelRotation={20}
										chartConfig={{
											backgroundColor: '#000000',
											backgroundGradientFrom: '#fecdd3',
											backgroundGradientTo: '#ec4899',
											decimalPlaces: 2, // optional, defaults to 2dp
											color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
											labelColor: (opacity = 1) =>
												`rgba(255, 255, 255, ${opacity})`,
											style: {
												borderRadius: 100,
											},
										}}
										style={{
											borderRadius: 10,
										}}
									/>
								) : (
									<></>
								)}
							</View>
							<View className='w-full flex h-60 bg-emerald-300 rounded-xl mt-4 p-4 items-center justify-center'>
								{data?.history?.map(el => el?.spo2_reading)?.length ? (
									<LineChart
										data={{
											labels: ['', '', '', '', '', '', '', '', '', ''],
											datasets: [
												{
													data: data?.history?.map(el => el?.spo2_reading),
												},
											],
											legend: ['Oxygen'],
										}}
										width={350}
										height={200}
										verticalLabelRotation={20}
										chartConfig={{
											backgroundColor: '#000000',
											backgroundGradientFrom: '#6ee7b7',
											backgroundGradientTo: '#10b981',
											decimalPlaces: 2, // optional, defaults to 2dp
											color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
											labelColor: (opacity = 1) =>
												`rgba(255, 255, 255, ${opacity})`,
											style: {
												borderRadius: 100,
											},
										}}
										bezier
										style={{
											borderRadius: 10,
										}}
									/>
								) : (
									<></>
								)}
							</View>
							<View className='w-full flex h-60 bg-red-300 rounded-xl mt-4 p-4 items-center justify-center'>
								{data?.history?.map(el => el?.bp_reading)?.length ? (
									<LineChart
										data={{
											labels: ['', '', '', '', '', '', '', '', '', ''],
											datasets: [
												{
													data: data?.history?.map(el => el?.bp_reading),
												},
											],
											legend: ['Blood Pressure'],
										}}
										width={350}
										height={200}
										verticalLabelRotation={20}
										chartConfig={{
											backgroundColor: '#000000',
											backgroundGradientFrom: '#fca5a5',
											backgroundGradientTo: '#ef4444',
											decimalPlaces: 2, // optional, defaults to 2dp
											color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
											labelColor: (opacity = 1) =>
												`rgba(255, 255, 255, ${opacity})`,
											style: {
												borderRadius: 100,
											},
										}}
										bezier
										style={{
											borderRadius: 10,
										}}
									/>
								) : (
									<></>
								)}
							</View>
						</View>
					</ScrollView>
				</View>
			</Animated.View>
		</View>
	);
}
export default ModalScreen;
2;
