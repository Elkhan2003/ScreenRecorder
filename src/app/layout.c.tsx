"use client";
import VideoRecorderProvider from "@/providers/VideoRecorderProvider";
import { FC, ReactNode } from "react";

interface ILayoutClientProps {
	children: ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
	return <VideoRecorderProvider>{children}</VideoRecorderProvider>;
};

export default LayoutClient;
