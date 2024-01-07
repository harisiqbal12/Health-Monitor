import { useContext } from 'react';
import { AuthContext } from '../context';

import type { AuthContextProps } from '../types';
import type { useAuthReturn } from './types';

const useAuth = (): useAuthReturn => {
	const { user, handleLogout, handleUser, setToken } = useContext(
		AuthContext
	) as AuthContextProps;

	return [user, handleLogout, handleUser, setToken];
};

export default useAuth;
