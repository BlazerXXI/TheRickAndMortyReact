import { ChangeEvent } from "react";

export interface Character {
	id: number;
	name: string;
	url: string;
	status: string;
	species: string;
	origin: { name: string; url: string };
	location: { name: string; url: string };
	gender: string;
}

export interface IBar {
	sortBy: string;
	setSortBy: (value: string) => void;
	filterBy: string[];
	handleFilterByChange: (event: ChangeEvent<HTMLInputElement>) => void;
	searchQuery: string;
	setSearchQuery: (value: string) => void;
	advancedSearch: boolean;
	setAdvancedSearch: (value: boolean) => void;
	setOpenFilter: (value: boolean) => void;
	openFilter: boolean;
}

export interface IPagination {
	page: number;
	setPage: (value: number) => void;
	pageSize: number;
}

export interface IFooter {
	page: number;
	setPage: (value: number) => void;
	pageSize: number;
}

export interface  ISearch {
	searchQuery: string;
	setSearchQuery: (value: string) => void;
	advancedSearch: boolean;
	setAdvancedSearch: (value: boolean) => void;
}

export interface IFilter {
	filterBy: string[];
	handleFilterByChange: (event: ChangeEvent<HTMLInputElement>) => void;
	openFilter: boolean;
	setOpenFilter: (value: boolean) => void;
}

export interface ISort {
	sortBy: string;
	setSortBy: (value: string) => void;
}
