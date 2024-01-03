import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './Auth';

export default function AppNavigator(): JSX.Element {
	return (
		<NavigationContainer>
			<AuthNavigator />
		</NavigationContainer>
	);
}
