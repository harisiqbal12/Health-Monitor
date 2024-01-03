import { createContext, useCallback, useMemo, useState } from 'react';

import type { ContextFunc, UserProps, AuthContextProps } from '../types';

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: ContextFunc = ({ children }) => {
	const [_user, setUser] = useState<UserProps>({
		isAuthenticated: null,
		email: null,
		imageURI: null,
	});

	const user = useMemo(() => _user, [_user]);

	const handleUser = useCallback((props: UserProps) => {
		setUser(props);
	}, []);

	const handleLogout = useCallback(() => {
		setUser({
			isAuthenticated: false,
			email: null,
			imageURI: null,
		});
	}, []);

	const value: AuthContextProps = {
		user,
		handleLogout,
		handleUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
