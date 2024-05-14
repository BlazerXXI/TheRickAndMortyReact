import { IPagination } from "src/types/types";

const Pagination = (props: IPagination) => {
	const { page, setPage, pageSize } = props;

	return (
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
	);
};

export default Pagination;
