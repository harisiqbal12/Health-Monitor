import { useCallback, useMemo, useState } from 'react';

import useToast from './useToast';
import useAuth from './useAuth';

import type { handleFetchProps, useLazyFetchReturnProps } from './types';

function useLazyFetch<T>(options?: {
	showToast?: boolean;
	vibrateOnError?: boolean;
	toastInterval?: number;
}): useLazyFetchReturnProps<T> {
	const [handleShowToast] = useToast();
	const [user] = useAuth();

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<{
		error: boolean;
		message: string | null;
	}>({
		error: false,
		message: null,
	});
	const [data, setData] = useState<T>(undefined as any);

	const _data = useMemo(() => data, [data]);

	const handleFetch: handleFetchProps = useCallback(
		async ({ api, method, headers, body, params, authentication }) => {
			try {
				setLoading(true);

				headers.append('accept', 'application/json');

				const parameters: any = {
					method,
					headers,
				};

				if (body && !params) {
					parameters.body = JSON.stringify(body);
				}

				if (body && params) {
					parameters.body = body.toString();
				}

				if (authentication) {
					headers.append('Authorization', `Bearer ${user?.token}`);
				}

				console.log(headers)
				console.log("token: ", user?.token)

				const res = await fetch(api, {
					...parameters,
				});

				const json = await res.json();

				if (!res.ok) {
					throw new Error(json.detail);
				}

				setData(json);

				return json;
			} catch (err: any) {
				setError({
					error: true,
					message: err?.message ?? 'Something went wrong',
				});
				if (options?.showToast) {
					handleShowToast(err?.message ?? 'Something went wrong', {
						vibrate: options?.vibrateOnError,
						interval: options?.toastInterval,
					});
				}
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return [loading, error, handleFetch, _data];
}

export default useLazyFetch;
