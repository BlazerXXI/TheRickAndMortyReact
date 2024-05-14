import FilterComponent from "components/FilterComponent/FilterComponent";
import SearchComponent from "components/SearchComponent/SearchComponent";
import SortComponent from "components/SortComponent/SortComponent";
import { IBar } from "src/types/types";

const Bar = (props: IBar) => {
	const {
		sortBy,
		setSortBy,
		filterBy,
		handleFilterByChange,
		searchQuery,
		setSearchQuery,
		advancedSearch,
		setAdvancedSearch,
		setOpenFilter,
		openFilter,
	} = props;

	return (
		<div className="flex gap-4 flex-col justify-center">
			<SearchComponent
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				advancedSearch={advancedSearch}
				setAdvancedSearch={setAdvancedSearch}
			/>
			<div className="flex gap-4 justify-center items-center relative">
				<FilterComponent
					filterBy={filterBy}
					handleFilterByChange={handleFilterByChange}
					openFilter={openFilter}
					setOpenFilter={setOpenFilter}
				/>
				<SortComponent sortBy={sortBy} setSortBy={setSortBy} />
			</div>
		</div>
	);
};

export default Bar;
