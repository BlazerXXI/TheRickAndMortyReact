import { Character } from "src/types/types"; // Corrected import path

const CharacterModal = (props: {
	character: Character;
	toggleModal: () => void;
}) => {
	const { character, toggleModal } = props;

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto" id="modal">
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div
						onClick={toggleModal}
						className="absolute inset-0 bg-gray-500 opacity-75"
					></div>
				</div>
				<div
					className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
					id="modal-content"
				>
					<button
						title="Close modal"
						type="button"
						className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white font-bold text-2xl"
						onClick={toggleModal}
					>
						&times;
					</button>
					<div className="inline-block align-bottom rounded-t-lg bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
						<div className="text-center">
							<h3 id="modal-title" className="font-bold text-3xl text-gray-900">
								Character Information
							</h3>
						</div>
						<div className="mt-5">
							<div className="grid grid-cols-1 gap-2">
								{Object.entries(character).map(
									([key, value]) =>
										value &&
										key !== "episode" &&
										key !== "id" &&
										key !== "image" &&
										key !== "created" &&
										key !== "url" && (
											<div className="flex gap-2" key={key}>
												<p className="text-base font-bold text-gray-900">
													{key.charAt(0).toUpperCase() + key.slice(1)}:
												</p>
												{key === "origin" || key === "location" ? (
													<span className="text-base font-normal text-gray-900 ">
														{value.name}
													</span>
												) : (
													<span className="text-gray-500">{value}</span>
												)}
											</div>
										)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CharacterModal;
