import { IFilter } from "src/types/types";

const FilterComponent = (props: IFilter) => {
	const { filterBy, handleFilterByChange, openFilter, setOpenFilter } = props;

	return (
		<>
			<button
				id="filterButton"
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
		</>
	);
};

export default FilterComponent;
