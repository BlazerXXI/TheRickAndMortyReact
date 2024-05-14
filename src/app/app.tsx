import Bar from "components/Bar/Bar";
import CharacterList from "components/CharacterList/CharacterList";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Loading from "components/Loading/Loading.tsx";
import { useCharacterData } from "hooks/useCharacterData";

const App = () => {
	const {
		page,
		setPage,
		charactersToShow,
		sortBy,
		setSortBy,
		filterBy,
		searchQuery,
		setSearchQuery,
		openFilter,
		setOpenFilter,
		advancedSearch,
		setAdvancedSearch,
		isLoading,
		error,
		data,
		handleFilterByChange,
		pageSize,
	} = useCharacterData();

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
