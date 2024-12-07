type VideoRecContextType = {
	status: string;
	startRecording: () => void;
	stopRecording: () => void;
	mediaBlobUrl: string | null;
};
