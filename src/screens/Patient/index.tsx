import { FontAwesome } from '@expo/vector-icons';
import { useContext, useEffect, useRef } from 'react';
import {
	Animated,
	View,
	Text,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	ScrollView,
} from 'react-native';

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
//@ts-ignore
function ModalScreen({ navigation }) {
	const animate: any = useRef(new Animated.Value(0)).current;
	const { height } = useWindowDimensions();

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
							<Text className='text-white font-bold text-2xl'>Haris Iqbal</Text>
							<Text className='text-white text-sx font-bold'>
								+92 (344-8112277)
							</Text>
							<Text className='text-white text-sx font-bold'>
								haris.iqbal@appiskey.com
							</Text>
						</View>
					</View>
					<ScrollView>
						<View className='w-full flex p-4 flex-col'>
							<Text className='uppercase font-bold text-gray-600'>
								PERSONAL INFO
							</Text>
							<View className='w-full flex flex-row items-center mt-4'>
								<View className='w-[33%] h-32 rounded-xl bg-white flex items-center justify-center flex-col'>
									<Text className='text-4xl font-black text-gray-600'>24</Text>
									<Text className='text-xs font-semibold text-gray-400'>Age</Text>
								</View>
								<View className='w-[33%] h-32 rounded-xl bg-white flex items-center justify-center flex-col mx-2'>
									<Text className='text-4xl font-black text-gray-600'>19</Text>
									<Text className='text-xs font-semibold text-gray-400'>BMI</Text>
								</View>
								<View className='w-[31%] h-32 rounded-xl bg-white flex items-center justify-center flex-col'>
									<Text className='text-4xl font-black text-gray-600'>A+</Text>
									<Text className='text-xs font-semibold text-gray-400'>
										Blood Group
									</Text>
								</View>
							</View>
						</View>
						<View className='w-full flex flex-col px-4 pb-40'>
							<View className='w-full flex h-60 bg-orange-200 rounded-xl p-4 '>
								<Text className='font-bold text-orange-50 uppercase'>
									Temperature
								</Text>
							</View>
							<View className='w-full flex h-60 bg-rose-200 rounded-xl mt-4 p-4'>
								<Text className='font-bold text-orange-50 uppercase'>
									Heartbeat
								</Text>
							</View>
							<View className='w-full flex h-60 bg-emerald-300 rounded-xl mt-4 p-4'>
								<Text className='font-bold text-orange-50 uppercase'>
									Oxygen
								</Text>
							</View>
							<View className='w-full flex h-60 bg-red-300 rounded-xl mt-4 p-4'>
								<Text className='font-bold text-orange-50 uppercase'>
									Blood Pressure
								</Text>
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
