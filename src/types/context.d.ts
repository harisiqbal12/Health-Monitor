import { UserProps } from './data';

export type ContextFunc = (props: { children: JSX.Element }) => JSX.Element;

export type AuthContextProps = {
	user: UserProps;
	handleLogout: () => void;
	handleUser: (props: UserProps) => void;
	setToken: (token: string) => Promise<void>;
};
