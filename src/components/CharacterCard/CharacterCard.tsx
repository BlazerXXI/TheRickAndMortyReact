import { Character } from "src/types/types";
import { characterStatus } from "../../utils/characterStatus";
import { useState } from "react";
import CharacterModal from "./CharacterModal";

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<li
				key={character.id}
				className="flex flex-col md:flex-row max-w-[500px] w-full cursor-pointer hover:scale-[1.01] transition duration-300 bg-[#3c3e44] m-[.75rem] shadow-md rounded-lg"
				onClick={toggleModal}
			>
				<img
					alt={character.name}
					loading="lazy"
					width={300}
					height={"auto"}
					src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`}
					className="flex-[2_1_0%] rounded-lg cursor-pointer"
				/>
				<div className="flex-[3_1_0%] p-4 flex flex-col justify-between gap-5">
					<div>
						<h2 className="text-[1.25rem] font-extrabold transition-all">{character.name}</h2>
						<h3 className="flex items-center">
							<span
								style={{
									backgroundColor: `#${characterStatus(character.status)}`,
								}}
								className="rounded-full w-[10px] h-[10px] mr-2 animate-pulse"
							></span>
							{character.status} - {character.species}
						</h3>
					</div>
				</div>
			</li>
			{isModalOpen && (
				<CharacterModal character={character} toggleModal={toggleModal} />
			)}
		</>
	);
};

export default CharacterCard;
