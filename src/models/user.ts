export interface User {
	id: number;
	first_name: string;
	last_name: string;
	join_date: string;
	banned: boolean;
	group_name: string;
	group_colour?: string;
	group_emoji?: string;
	group_icon_file?: string
}

