import Pagination from "components/Pagination/Pagination";
import { IFooter } from "src/types/types";

const Footer = (props: IFooter) => {
	const { page, setPage, pageSize } = props;

	return (
		<footer>
			<Pagination page={page} setPage={setPage} pageSize={pageSize} />
		</footer>
	);
};

export default Footer;
