"use client";
import { VideoRecContext } from "@/providers/VideoRecProvider";
import { useContext } from "react";

export const useVideoRec = (): VideoRecContextType => {
	const context = useContext(VideoRecContext);
	if (!context) {
		throw new Error("useVideoRec must be used within a VideoRecProvider");
	}
	return context;
};
