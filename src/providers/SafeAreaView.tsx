import { SafeAreaView, Platform, View } from 'react-native';

export default function SafeArea({
	children,
	backgroundColor = '#000000',
}: {
	children?: React.ReactNode;
	backgroundColor?: string;
}): JSX.Element {
	if (Platform.OS === 'ios') {
		return (
			<View
				style={{
					backgroundColor,
				}}
				className='w-full h-full pt-10'>
				{children}
			</View>
		);
	}

	return (
		<SafeAreaView
			style={{
				backgroundColor,
			}}
			className='w-full h-full pt-10'>
			{children}
		</SafeAreaView>
	);
}
