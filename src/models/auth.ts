import { PlayerProfile } from './player';

/**
 * Information stored within player jwts
 */
export interface PlayerJwt {
	id: number;
	group: string;
	password_reset: boolean;
}

/**
 * Pulled when a player first logs in.
 * Added as it's own DTO because it seemed the most efficient.
 */
export interface InitialLogin {
	jwt: string;
	profile: PlayerProfile;
	permissions: string[];
}
