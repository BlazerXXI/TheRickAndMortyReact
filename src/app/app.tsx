import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Loading from "components/Loading/Loading.tsx";
import { useState, useEffect, ChangeEvent } from "react";
import { useQuery } from "react-query";

type Character = {
	id: number;
	name: string;
	url: string;
	status: string;
	species: string;
	origin: { name: string; url: string };
	location: { name: string; url: string };
	gender: string;
};

const App = () => {
	const [page, setPage] = useState<number>(1);

	const [sortBy, setSortBy] = useState<string>("Default");
	const [filterBy, setFilterBy] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const [openFilter, setOpenFilter] = useState<boolean>(false);
	const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

	useEffect(() => {
		const storedSearchQuery = localStorage.getItem("searchQuery");
		if (storedSearchQuery !== null) {
			setSearchQuery(storedSearchQuery);
		}
	}, [page]);

	useEffect(() => {
		localStorage.setItem("searchQuery", searchQuery);
	}, [searchQuery]);

	const fetchCharacters = async (page: number = 1) => {
		const response = await fetch(
			`https://rickandmortyapi.com/api/character?page=${page}`
		);
		const data = await response.json();

		return data;
	};

	const { isLoading, error, data } = useQuery(["characters", page], () =>
		fetchCharacters(page)
	);
	if (isLoading) return <Loading />;
	if (error) return <h3>Error</h3>;

	const characters: Character[] = data.results;

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

	const characterStatus = (status: string) => {
		switch (status) {
			case "Alive":
				return "55cc44";
			case "Dead":
				return "cc4444";
			case "unknown":
				return "999999";
			default:
				return "999999";
		}
	};

	const handleFilterByChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFilter = event.target.value;
		if (filterBy.includes(selectedFilter)) {
			setFilterBy(filterBy.filter((filter) => filter !== selectedFilter));
		} else {
			setFilterBy([...filterBy, selectedFilter]);
		}
	};

	return (
		<>
			<Header />
			<main className="p-4 mt-[80px] text-white">
				<div className="flex gap-4 flex-col justify-center">
					<div className="flex relative">
						<input
							className="w-full"
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							title="Search"
							placeholder="Search"
						/>
						<span
							title="Advanced Search"
							className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-50 transition text-[14px] ${
								advancedSearch ? "text-[#69ff55]" : ""
							}`}
							onClick={() => setAdvancedSearch(!advancedSearch)}
						>
							Advanced Search
						</span>
					</div>
					<div className="flex gap-4 justify-center items-center relative">
						<button
							className="border-[#3c3e44] border-[2px] rounded-full p-2 basis-1/2"
							type="button"
							onClick={() => setOpenFilter(!openFilter)}
						>
							Filter
						</button>
						<form
							id="filter"
							className={`${
								openFilter ? "flex" : "hidden"
							} flex-col gap-4 justify-center items-center absolute bg-[#3c3e44] p-4 rounded-lg top-11 left-0 z-10`}
						>
							{["Alive", "Dead", "unknown"].map((status) => (
								<div key={status}>
									<label
										className={`${
											filterBy.includes(status) ? "text-[#69ff55]" : ""
										} cursor-pointer`}
										htmlFor={status}
									>
										{status}
									</label>
									<input
										type="checkbox"
										title={status}
										id={status}
										value={status}
										onChange={handleFilterByChange}
										checked={filterBy.includes(status)}
										className="hidden"
									/>
								</div>
							))}
						</form>
						<select
							onChange={(e) => setSortBy(e.target.value)}
							className="basis-1/2"
							name="sort"
							id="sort"
							title="Sort"
						>
							<option value="Default">Default</option>
							<option value="A-Z">A-Z</option>
							<option value="Z-A">Z-A</option>
						</select>
					</div>
				</div>
				<section>
					<ul className="flex flex-wrap justify-center gap-4">
						{charactersToShow.length === 0 ? (
							<li>
								<p className="text-white text-center font-bold ">
									No characters found
								</p>
							</li>
						) : (
							charactersToShow.map((character) => (
								<li
									key={character.id}
									className="flex flex-col md:flex-row w-full hover:scale-[1.01] transition duration-300 bg-[#3c3e44] m-[.75rem] shadow-md rounded-lg"
								>
									<img
										alt={character.name}
										loading="lazy"
										width={300}
										height={"auto"}
										src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`}
										className="flex-[2_1_0%] rounded-lg cursor-pointer"
										// TODO: add modal window
										// Modal view of details of a specific character
									/>
									<div className="flex-[3_1_0%] p-4 flex flex-col justify-between gap-5">
										<div>
											<a href={character.url}>
												<h2 className="text-[1.25rem] font-extrabold">
													{character.name}
												</h2>
											</a>
											<p className="text-[#9e9e9e]">
												Gender - {character.gender}
											</p>
											<h3 className="flex items-center">
												<span
													style={{
														backgroundColor: `#${characterStatus(
															character.status
														)}`,
													}}
													className={`rounded-full w-[10px] h-[10px] mr-2 animate-pulse`}
												></span>
												{character.status} - {character.species}
											</h3>
										</div>
										<div>
											<p className="text-[#9e9e9e]">Last known location:</p>
											{character.origin.name !== "unknown" ? (
												<a href={character.origin.url}>
													<h2>{character.origin.name}</h2>
												</a>
											) : (
												<span className="text-red-700 font-bold animate-pulse text-[20px]">
													<h2>Information is not available</h2>
												</span>
											)}
										</div>
										<div>
											<p className="text-[#9e9e9e]">First seen in:</p>
											<a href={character.location.url}>
												{character.location.name}
											</a>
										</div>
									</div>
								</li>
							))
						)}
					</ul>
				</section>
				<div className="flex justify-center mt-4 gap-4">
					<button
						type="button"
						onClick={() => setPage(page - 1)}
						disabled={page === 1}
					>
						Previous Page
					</button>
					<p className="text-[20px] text-gray-300/60">{page}</p>
					<button
						type="button"
						onClick={() => setPage(page + 1)}
						disabled={page === pageSize}
					>
						Next Page
					</button>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default App;
