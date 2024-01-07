import { ToastAndroid, Platform, Vibration } from 'react-native';

import type { useToastProps } from './types';

export default function useToast(): useToastProps {
	const handleToast = (
		message: string,
		opts?: {
			interval?: number;
			vibrate?: boolean;
		}
	) => {
		if (Platform.OS === 'android') {
			ToastAndroid.show(message, opts?.interval ?? 500);
		}

		if (opts?.vibrate) {
			Vibration.vibrate();
		}
	};

	return [handleToast];
}
