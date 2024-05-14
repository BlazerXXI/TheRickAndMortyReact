import { ISort } from "src/types/types";

const SortComponent = (props: ISort) => {
	const { sortBy, setSortBy } = props;

	return (
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
	);
};

export default SortComponent;
