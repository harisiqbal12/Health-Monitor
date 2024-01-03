import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './Auth';
import { AuthContext } from '../context';
import { AuthContextProps } from '../types';

export default function AppNavigator(): JSX.Element {
	const { user } = useContext(AuthContext) as AuthContextProps;

	if (user.isAuthenticated === null) {
		// show loading state
	}

	if (user.isAuthenticated === false) {
		// show auth navigator
	}

	// show App/Home

	return (
		<NavigationContainer>
			<AuthNavigator />
		</NavigationContainer>
	);
}
