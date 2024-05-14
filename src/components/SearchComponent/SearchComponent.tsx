import {  ISearch } from "src/types/types";

const SearchComponent = (props:  ISearch) => {
	const { searchQuery, setSearchQuery, advancedSearch, setAdvancedSearch } =
		props;

	return (
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
	);
};

export default SearchComponent;
