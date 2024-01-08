import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, Patient, Profile } from '../../screens';

const Stack = createNativeStackNavigator();

export default function HomeNavigator(): JSX.Element {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Home'
				options={{
					headerShown: false,
					statusBarStyle: 'dark',
					statusBarTranslucent: true,
				}}
				component={Home}
			/>

			<Stack.Screen
				name='Patient'
				options={{
					headerShown: false,
					statusBarStyle: 'dark',
					statusBarTranslucent: true,
					animation: 'slide_from_bottom',
				}}
				component={Patient}
			/>
			<Stack.Screen
				name='Profile'
				options={{
					headerShown: false,
					statusBarStyle: 'dark',
					statusBarTranslucent: true,
				}}
				component={Profile}
			/>
		</Stack.Navigator>
	);
}
