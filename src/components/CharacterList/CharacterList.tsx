import { Character } from "src/types/types";
import CharacterCard from "components/CharacterCard/CharacterCard";

const CharacterList = ({ characters }: { characters: Character[] }) => (
	<ul className="flex flex-wrap justify-center gap-4">
		{characters.length === 0 ? (
			<li>
				<p className="text-white text-center font-bold ">
					No characters found on this page.
					<br />
					Please select another page
				</p>
			</li>
		) : (
			characters.map((character: Character) => (
				<CharacterCard key={character.id} character={character} />
			))
		)}
	</ul>
);

export default CharacterList;
