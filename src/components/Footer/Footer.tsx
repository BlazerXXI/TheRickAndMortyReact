import Pagination from "components/Pagination/Pagination";

const Footer = (props) => {
	const { page, setPage, pageSize } = props;

	return (
		<footer>
			<Pagination page={page} setPage={setPage} pageSize={pageSize} />
		</footer>
	);
};

export default Footer;
