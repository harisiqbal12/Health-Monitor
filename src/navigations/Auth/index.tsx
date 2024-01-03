import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../../screens';

const Stack = createNativeStackNavigator();

export default function AuthNavigator(): JSX.Element {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				options={{
					headerShown: false,
					statusBarStyle: 'light',
					statusBarTranslucent: true,
					
				}}
				component={Login}
			/>
		</Stack.Navigator>
	);
}
