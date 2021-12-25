export interface IUser {
	_id: number;
	email: string;
	profile: string;
	locallyVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProfile {
	roles: string[];
	user: string;
	createdAt: Date;
	updatedAt: Date;
}
