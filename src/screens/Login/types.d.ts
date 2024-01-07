export type UserProps = {
	email: string | null;
	password: string | null;
};

export type UserErrorProps = {
	email: boolean;
	password: boolean;
};
