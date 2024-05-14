export const characterStatus = (status: string) => {
	switch (status) {
		case "Alive":
			return "55cc44";
		case "Dead":
			return "cc4444";
		case "unknown":
			return "999999";
		default:
			return "999999";
	}
};
