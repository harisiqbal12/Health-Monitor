import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
	label: string;
	icon?: React.ReactNode;
}

export interface ButtonProps {
	title: string;
	loading?: boolean;
	children?: React.ReactNode;
}
