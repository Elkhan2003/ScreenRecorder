"use client";
import { useContext } from "react";
import { ScreenRecordingContext } from "@/providers/ScreenRecordingProvider";

export const useScreenRecording = () => {
	const context = useContext(ScreenRecordingContext);
	if (!context) {
		throw new Error(
			"useScreenRecording must be used within a ScreenRecordingProvider"
		);
	}
	return context;
};
