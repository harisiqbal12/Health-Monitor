export type UserProps = {
	isAuthenticated: boolean | null;
	email: string | null;
	imageURI: string | null;
	name: string | null;
	id: string | number | null;
	user_role: string | null;
	token?: string | null;
};

export type UserRoles = 'patient' | 'caretaker' | 'doctor';

export type CurrentPatientsData = {
	name: string;
	email: string;
	gender: 'male' | 'female' | 'rather_not_say';
	id: number;
	additional_details: {
		phone: string;
		age: number;
		blood_group: BloodGroup;
	};
	user_role: 'patient';
	created_at: string;
	caretakers: Array<{
		name: string;
		email: string;
		gender: Gender;
		id: number;
		additional_details: {
			phone: string;
			age: number;
			blood_group: BloodGroup;
		};
		user_role: string;
		created_at: string;
	}>;
	doctors: Array<{
		name: string;
		email: string;
		gender: string;
		id: number;
		additional_details: {
			phone: string;
			age: number;
			blood_group: BloodGroup;
		};
		user_role: UserRoles;
		created_at: string;
		updated_at: null;
	}>;
	history: Array<{
		spo2_reading: number;
		bp_reading: number;
		temp_reading: number;
		heartbeat_reading: number;
		id: number;
		created_at: string;
	}>;
};

export type Gender = 'male' | 'female' | 'rather_not_say';
export type BloodGroup =
	| 'A+'
	| 'A-'
	| 'AB+'
	| 'AB-'
	| 'B+'
	| 'B-'
	| 'O+'
	| 'O-'
	| 'Unknown';
