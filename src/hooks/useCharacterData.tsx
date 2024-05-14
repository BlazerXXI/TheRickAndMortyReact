import { useState, useEffect, ChangeEvent } from "react";
import { useQuery } from "react-query";
import { Character } from "src/types/types";

export const useCharacterData = () => {
	const [page, setPage] = useState<number>(1);
	const [characters, setCharacters] = useState<Character[]>([]);
	const [sortBy, setSortBy] = useState<string>("Default");
	const [filterBy, setFilterBy] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [openFilter, setOpenFilter] = useState<boolean>(false);
	const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

	useEffect(() => {
		const storedSearchQuery = localStorage.getItem("searchQuery");
		const storedSortBy = localStorage.getItem("sortBy");
		const storedFilterBy = localStorage.getItem("filterBy");
		if (storedSearchQuery !== null) {
			setSearchQuery(storedSearchQuery);
		}
		if (storedSortBy !== null) {
			setSortBy(JSON.parse(storedSortBy));
		}
		if (storedFilterBy !== null) {
			setFilterBy(JSON.parse(storedFilterBy));
		}
	}, [page]);

	useEffect(() => {
		localStorage.setItem("searchQuery", searchQuery);
	}, [searchQuery]);
	useEffect(() => {
		localStorage.setItem("sortBy", JSON.stringify(sortBy));
	}, [sortBy]);
	useEffect(() => {
		localStorage.setItem("filterBy", JSON.stringify(filterBy));
	}, [filterBy]);

	const fetchCharacters = async (page: number = 1) => {
		const response = await fetch(
			`https://rickandmortyapi.com/api/character?page=${page}`
		);
		const data = await response.json();

		setCharacters(data.results);
		return data;
	};

	const { isLoading, error, data } = useQuery(["characters", page], () =>
		fetchCharacters(page)
	);

	const filteredCharacters = characters.filter((character) => {
		if (filterBy.length === 0) return true;
		return filterBy.includes(character.status);
	});

	const sortedCharacters = [...filteredCharacters].sort((a, b) => {
		if (sortBy === "A-Z") return a.name.localeCompare(b.name);
		if (sortBy === "Z-A") return b.name.localeCompare(a.name);
		return 0;
	});

	const searchFilteredCharacters = sortedCharacters.filter((character) => {
		const searchQueryLowerCase = searchQuery.toLowerCase();
		return !advancedSearch
			? character.name.toLowerCase().includes(searchQueryLowerCase)
			: character.name.toLowerCase().includes(searchQueryLowerCase) ||
					character.species.toLowerCase().includes(searchQueryLowerCase) ||
					character.origin.name.toLowerCase().includes(searchQueryLowerCase) ||
					character.location.name
						.toLowerCase()
						.includes(searchQueryLowerCase) ||
					character.gender.toLowerCase().includes(searchQueryLowerCase);
	});

	const pageSize: number = data?.info?.pages || 0;
	const charactersToShow: Character[] = searchFilteredCharacters;

	const handleFilterByChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFilter = event.target.value;
		if (filterBy.includes(selectedFilter)) {
			setFilterBy(filterBy.filter((filter) => filter !== selectedFilter));
		} else {
			setFilterBy([...filterBy, selectedFilter]);
		}
	};

	return {
		page,
		setPage,
		characters,
		sortBy,
		setSortBy,
		filterBy,
		setFilterBy,
		searchQuery,
		setSearchQuery,
		openFilter,
		setOpenFilter,
		advancedSearch,
		setAdvancedSearch,
		isLoading,
		error,
		data,
		charactersToShow,
		handleFilterByChange,
		pageSize,
	};
};

export default useCharacterData;
