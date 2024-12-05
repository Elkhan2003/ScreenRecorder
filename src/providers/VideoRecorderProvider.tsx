"use client";
import { FC, ReactNode } from "react";

interface IVideoRecorderProviderProps {
	children: ReactNode;
}

const VideoRecorderProvider: FC<IVideoRecorderProviderProps> = ({
	children,
}) => {
	return <>{children}</>;
};

export default VideoRecorderProvider;
