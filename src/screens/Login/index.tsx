import { useCallback, useState } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import SafeAreaView from '../../providers/SafeAreaView';
import { Button, Input } from '../../components';
import { useToast, useLazyFetch, useAuth } from '../../hooks';
import { api } from '../../common';

import type { UserProps, UserErrorProps } from './types';

export default function Login(): JSX.Element {
	const [handleToast] = useToast();
	const [_, __, handleUser, setToken] = useAuth();

	const [loading, apiError, handleFetch] = useLazyFetch({
		showToast: true,
		vibrateOnError: true,
	});

	const [user, setUser] = useState<UserProps>({
		email: null,
		password: null,
	});

	const [errors, setErrors] = useState<UserErrorProps>({
		email: false,
		password: false,
	});

	const handleChangeText = (type: string) => (text: string) => {
		setUser(prev => ({ ...prev, [type]: text }));
	};

	const headers = new Headers();

	const handleLogin = useCallback(async () => {
		try {
			const localErrors: UserErrorProps = {
				email: false,
				password: false,
			};

			let error: boolean = false;

			if (!user?.email) {
				localErrors.email = true;
				error = true;
			}

			if (!user.password) {
				localErrors.password = true;
				error = true;
			}

			if (error) {
				setErrors({ ...localErrors });
				handleToast('Missing input fields', {
					vibrate: true,
				});
				return;
			}

			if (!user.email?.includes('@') || !user.email?.includes('.com')) {
				localErrors.email = true;
				setErrors({ ...localErrors });
				handleToast('Invalid email', {
					vibrate: true,
				});

				return;
			}

			setErrors({ ...localErrors });

			const params = new URLSearchParams();
			params.append('grant_type', 'password');
			params.append('username', user.email.toLowerCase());
			params.append('password', user.password ?? '');
			params.append('client_id', '');
			params.append('client_secret', '');

			headers.append('Content-Type', 'application/x-www-form-urlencoded');

			const res = await handleFetch({
				api: api.LOGIN,
				method: 'POST',
				headers,
				params: true,
				body: params,
			});

			await setToken(res?.access_token);
			handleUser({
				email: user?.email,
				isAuthenticated: true,
				imageURI: null,
				name: res?.user?.name,
				user_role: res?.user?.user_role,
				id: res?.user?.id,
			});
		} catch (err) {}
	}, [user]);

	return (
		<SafeAreaView backgroundColor='#ef233c'>
			<View className='w-full h-full bg-[#edf2f4] flex flex-col relative'>
				<View className='w-full h-[50%] bg-[#ef233c] rounded-b-[40px] px-10 flex flex-col justify-center'>
					<View className='flex flex-col '>
						<Text className='text-white font-black text-[40px]'>
							Welcome Back :)
						</Text>
						<Text className='text-sx text-white font-semibold'>
							Login to your account
						</Text>
					</View>
				</View>
				<View className='w-full h-[50%] flex flex-col px-6 py-10'>
					<Input
						label='Email'
						placeholder='Enter your email'
						keyboardType='email-address'
						returnKeyType='next'
						autoCapitalize='none'
						icon={
							<MaterialCommunityIcons name='email' size={24} color='#6b7280' />
						}
						onChangeText={handleChangeText('email')}
						error={errors.email}
					/>
					<View className='my-2' />
					<Input
						label='Password'
						placeholder='***********'
						textContentType='password'
						secureTextEntry
						returnKeyType='send'
						autoCapitalize='none'
						icon={
							<MaterialCommunityIcons
								name='form-textbox-password'
								size={24}
								color='#6b7280'
							/>
						}
						onChangeText={handleChangeText('password')}
						error={errors.password}
						errorMessage={apiError?.message ?? ''}
					/>
					<View className='my-4' />
					<Button title='Login' onPress={handleLogin} loading={loading}>
						<MaterialIcons name='arrow-forward-ios' size={20} color='#fff' />
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
}
