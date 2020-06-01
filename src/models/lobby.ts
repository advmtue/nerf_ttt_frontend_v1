export interface Lobby {
	id: number;
	name: string;
	date_created: string;
	lobby_status: number;
	owner_first_name: string;
	owner_last_name: string;
	owner_group: string;
	owner_group_icon_file: string;
	owner_group_colour: string;
	owner_group_emoji: string;
	player_count: number;
}