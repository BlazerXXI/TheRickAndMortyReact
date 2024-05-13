import GitHubLogo from "./GitHubLogo";
import RickAndMortyLogo from "./RickAndMortyLogo";

const Header = () => {
	return (
		<header className=" bg-white/90 fixed top-0 w-full z-20 p-4 flex justify-between items-center">
			<a href="/">
				<p className="text-[0px] absolute top-0 left-0 text-transparent">
					The Rick and Morty
				</p>
				<RickAndMortyLogo />
			</a>
			<a
				target="_blank"
				rel="noreferrer noopener nofollow"
				href="https://github.com/BlazerXXI/TheRickAndMorty"
			>
				<p className="text-[0px] absolute top-0 left-0 text-transparent">
					GitHub
				</p>
				<GitHubLogo />
			</a>
		</header>
	);
};

export default Header;
