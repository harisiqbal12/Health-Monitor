import type { AuthContextProps, UserProps } from '../types';

export type useToastProps = [
	handleToast: (
		message: string,
		opts?: {
			interval?: number;
			vibrate?: boolean;
		}
	) => void
];

export type useFetchErrors = {
	error: boolean;
	message: string | null;
};

export type useLazyFetchReturnProps<T> = [
	loading: boolean,
	error: useFetchErrors,
	handleFetch: handleFetchProps,
	data: T
];

export type handleFetchProps = (opts: {
	api: string;
	method: 'POST' | 'GET' | 'DELETE' | 'PUT';
	headers: Headers;
	body?: { [key: string]: any } | URLSearchParams;
	params?: boolean;
	authentication?: boolean;
}) => Promise<{ [key: string]: any }>;

export type useLazyFetchProps<T> = (opts?: {
	showToast?: boolean;
	toastInterval?: number;
	vibrateOnError?: boolean;
}) => useLazyFetchReturnProps<T>;

export type useAuthReturn = [
	user: UserProps,
	handleLogout: () => void,
	handleUser: (props: UserProps) => void,
	setToken: (token: string) => Promise<void>
];
