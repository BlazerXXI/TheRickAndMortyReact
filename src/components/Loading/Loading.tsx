import "./loading.css";

const Loading: React.FC = () => {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-gray-900">
			<div className="flex flex-col items-center">
				<div className="flex items-center justify-center">
					<div className="flex items-center justify-center h-12 w-12 border-b-2 border-gray-700 rounded-full animate-spin">
						<div className="flex items-center justify-center h-12 w-12">
							<div className="flex items-center justify-center h-6 w-6 rounded-full bg-white animate-pulse">
								<span className="animate-bounce"></span>
							</div>
							<div className="flex items-center justify-center h-6 w-6 rounded-full bg-white animate-pulse delay-200">
								<span className="animate-bounce"></span>
							</div>
							<div className="flex items-center justify-center h-6 w-6 rounded-full bg-white animate-pulse delay-400">
								<span className="animate-bounce"></span>
							</div>
							<div className="flex items-center justify-center h-6 w-6 rounded-full bg-white animate-pulse delay-600">
								<span className="animate-bounce"></span>
							</div>
						</div>
					</div>
				</div>

				<span className="text-white text-center font-bold mt-4">
					Loading...
					<br />
					<span>Don't forget to drink your beer</span>
				</span>
			</div>
		</div>
	);
};

export default Loading;
