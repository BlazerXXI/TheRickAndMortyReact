import { Character } from "src/types/types";

const CharacterModal = (props: {
	character: Character;
	toggleModal: () => void;
}) => {
	const { character, toggleModal } = props;

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto" id="modal">
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<div
					className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
					id="modal-content"
				>
					<div className="inline-block align-bottom rounded-t-lg bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
						<div className="flex items-center justify-between">
							<h3
								id="modal-title"
								className="text-base font-medium text-gray-900"
							>
								Character Information
							</h3>
							<button
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								onClick={() =>
									document.getElementById("modal")?.removeAttribute("style")
								}
							>
								<span className="sr-only">Close</span>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 12L2 6.58697L8.29389 3H14.5L19.7071 6.58697L16 12L19.7071 17.413L14.5 21H8.29389L2 15.413L5.29389 12L2 6.58697L8.29389 4H14.5L19.7071 0.586971L16 4L19.7071 7.413L14.5 11.5L8.29389 7.413L2 11.413L5.29389 12L2 16.5869L8.29389 18.5869L14.5 22.5L19.7071 18.5869L16 12L19.7071 15.413L14.5 19.5L8.29389 13.413Z"
									/>
								</svg>
							</button>
						</div>
						<div className="mt-5">
							<div className="grid grid-cols-1 gap-2">
								<h4 className="text-base font-medium text-gray-900">
									Name: {character.name}
								</h4>
								<h4 className="text-base font-medium text-gray-900">
									Species: {character.species}
								</h4>
								<h4 className="text-base font-medium text-gray-900">
									Status: {character.status}
								</h4>
								<h4 className="text-base font-medium text-gray-900">
									Gender: {character.gender}
								</h4>
								<h4 className="text-base font-medium text-gray-900">
									Origin: {character.origin.name}
								</h4>
								<h4 className="text-base font-medium text-gray-900">
									Location: {character.location.name}
								</h4>
							</div>
							<div className="mt-4">
								<button
									type="button"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={() => toggleModal()}
								>
									<a href="#">Close</a>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CharacterModal;
