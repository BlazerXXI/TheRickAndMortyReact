import Bar from "components/Bar/Bar";
import CharacterList from "components/CharacterList/CharacterList";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Loading from "components/Loading/Loading.tsx";
import Pagination from "components/Pagination/Pagination";
import { useState, useEffect, ChangeEvent } from "react";
import { useQuery } from "react-query";
import { Character } from "src/types/types";

const App = () => {
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
	if (isLoading) return <Loading />;
	if (error) return <h3>Error</h3>;

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

	const pageSize: number = data.info.pages;
	const charactersToShow: Character[] = searchFilteredCharacters;

	const handleFilterByChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFilter = event.target.value;
		if (filterBy.includes(selectedFilter)) {
			setFilterBy(filterBy.filter((filter) => filter !== selectedFilter));
		} else {
			setFilterBy([...filterBy, selectedFilter]);
		}
	};

	// <FilterBar sortBy={sortBy} handleSortByChange={handleSortByChange} />
	// {isLoading ? (
	// 	<LoadingIndicator />
	// ) : error ? (
	// 	<div>Error: {error.message}</div>
	// ) : (
	// 	<>
	// 		<CharacterList characters={characters} />
	// 		<Pagination
	// 			currentPage={page}
	// 			totalPages={20} // assuming there are 20 pages
	// 			handlePageChange={handlePageChange}
	// 		/>
	// 	</>
	// )}

	return (
		<>
			<Header />
			<main className="p-4 mt-[80px] text-white">
				<Bar
					sortBy={sortBy}
					setSortBy={setSortBy}
					filterBy={filterBy}
					handleFilterByChange={handleFilterByChange}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					advancedSearch={advancedSearch}
					setAdvancedSearch={setAdvancedSearch}
					setOpenFilter={setOpenFilter}
					openFilter={openFilter}
				/>
				<section>
					{isLoading ? (
						<Loading />
					) : error ? (
						<div>
							<p className="text-white text-center font-bold">
								Error : {data.message}
							</p>
						</div>
					) : (
						<CharacterList characters={charactersToShow} />
					)}
				</section>
			</main>
			<Footer page={page} setPage={setPage} pageSize={pageSize} />
		</>
	);
};

export default App;
