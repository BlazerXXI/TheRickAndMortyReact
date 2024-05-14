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
					title="Filter by status"
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
					value={sortBy}
					id="sort"
					title="Sort"
				>
					<option value="Default">Default</option>
					<option value="A-Z">A-Z</option>
					<option value="Z-A">Z-A</option>
				</select>
			</div>
		</div>
	);
};

export default Bar;
