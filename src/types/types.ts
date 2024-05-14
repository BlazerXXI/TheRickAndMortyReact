export interface Character {
	id: number;
	name: string;
	url: string;
	status: string;
	species: string;
	origin: { name: string; url: string };
	location: { name: string; url: string };
	gender: string;
};