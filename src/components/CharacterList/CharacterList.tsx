import React from "react";
import { Character } from "src/types/types";
import { characterStatus } from "../../utils/characterStatus";

const CharacterList = (props) => {
	const { characters } = props;

	return (
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
					<li
						key={character.id}
						className="flex flex-col md:flex-row w-full hover:scale-[1.01] transition duration-300 bg-[#3c3e44] m-[.75rem] shadow-md rounded-lg"
					>
						<img
							alt={character.name}
							loading="lazy"
							width={300}
							height={"auto"}
							src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`}
							className="flex-[2_1_0%] rounded-lg cursor-pointer"
							// TODO: add modal window
							// Modal view of details of a specific character
						/>
						<div className="flex-[3_1_0%] p-4 flex flex-col justify-between gap-5">
							<div>
								<a href={character.url}>
									<h2 className="text-[1.25rem] font-extrabold">
										{character.name}
									</h2>
								</a>
								<p className="text-[#9e9e9e]">Gender - {character.gender}</p>
								<h3 className="flex items-center">
									<span
										style={{
											backgroundColor: `#${characterStatus(character.status)}`,
										}}
										className={`rounded-full w-[10px] h-[10px] mr-2 animate-pulse`}
									></span>
									{character.status} - {character.species}
								</h3>
							</div>
							<div>
								<p className="text-[#9e9e9e]">Last known location:</p>
								{character.origin.name !== "unknown" ? (
									<a href={character.origin.url}>
										<h2>{character.origin.name}</h2>
									</a>
								) : (
									<span className="text-red-700 font-bold animate-pulse text-[20px]">
										<h2>Information is not available</h2>
									</span>
								)}
							</div>
							<div>
								<p className="text-[#9e9e9e]">First seen in:</p>
								<a href={character.location.url}>{character.location.name}</a>
							</div>
						</div>
					</li>
				))
			)}
		</ul>
	);
};

export default CharacterList;
