type RecordingStatus = "not started" | "recording" | "stopped" | "error";

type ScreenRecordingContextType = {
	startRecording: () => Promise<void>;
	stopRecording: () => void;
	downloadRecording: () => void;
	mediaBlobUrl: string | null;
	status: RecordingStatus;
};
