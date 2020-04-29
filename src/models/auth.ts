export interface LoginResponse {
	success: boolean;
	token: string;
	passwordReset: boolean;
}

export interface PasswordResetResponse {
	success: boolean;
}
