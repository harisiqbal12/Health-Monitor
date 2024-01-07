import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './Auth';
import HomeNavigator from './Home';
import useAuth from '../hooks/useAuth';

export default function AppNavigator(): JSX.Element {
	const [user] = useAuth();

	if (user.isAuthenticated === null) {
		// show loading state
		return <ActivityIndicator />;
	}

	if (user.isAuthenticated === false) {
		return (
			<NavigationContainer>
				<AuthNavigator />
			</NavigationContainer>
		);
		// show auth navigator
	}

	// show App/Home

	return (
		<NavigationContainer>
			<HomeNavigator />
		</NavigationContainer>
	);
}
