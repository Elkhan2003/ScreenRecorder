"use client";
import React, { createContext, ReactNode } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export const VideoRecContext = createContext<VideoRecContextType | undefined>(
	undefined
);

const VideoRecProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { status, startRecording, stopRecording, mediaBlobUrl } =
		useReactMediaRecorder({
			screen: true,
			audio: true,
			mediaRecorderOptions: { mimeType: "video/mp4" },
		});

	return (
		<VideoRecContext.Provider
			value={{
				status,
				startRecording,
				stopRecording,
				mediaBlobUrl: mediaBlobUrl!,
			}}>
			{children}
		</VideoRecContext.Provider>
	);
};

export default VideoRecProvider;
