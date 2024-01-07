import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../common';
import type { ContextFunc, UserProps, AuthContextProps } from '../types';

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: ContextFunc = ({ children }) => {
	const headers = new Headers();

	const [_user, setUser] = useState<UserProps>({
		isAuthenticated: null,
		email: null,
		imageURI: null,
		name: null,
		user_role: null,
		id: null,
		token: null,
	});

	const user = useMemo(() => _user, [_user]);

	useEffect(() => {
		(async () => {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				headers.append('Authorization', `Bearer ${token}`);
				headers.append('accept', 'application/json');

				const apiResponse = await fetch(api.USERME, {
					method: 'GET',
					headers,
				});

				const res = await apiResponse.json();
				if (!apiResponse.ok) throw new Error(res?.detail);

				setUser({
					isAuthenticated: !!res?.email,
					email: res?.email,
					imageURI: null,
					name: res?.name,
					user_role: res?.user_role,
					id: res?.id,
					token,
				});

				return;
			}
			setUser({
				isAuthenticated: false,
				email: null,
				imageURI: null,
				name: null,
				user_role: null,
				id: null,
			});
		})();
	}, []);

	const handleUser = useCallback((props: UserProps) => {
		setUser(props);
	}, []);

	const setToken = useCallback(async (token: string) => {
		await AsyncStorage.setItem('token', token);
	}, []);

	const handleLogout = useCallback(() => {
		setUser({
			isAuthenticated: false,
			email: null,
			imageURI: null,
			name: null,
			user_role: null,
			id: null,
			token: null,
		});
	}, []);

	const value: AuthContextProps = {
		user,
		handleLogout,
		handleUser,
		setToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
