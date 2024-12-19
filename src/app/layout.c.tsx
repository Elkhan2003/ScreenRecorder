"use client";
import { FC, ReactNode } from "react";
import ScreenRecordingProvider from "@/providers/ScreenRecordingProvider";

interface ILayoutClientProps {
	children: ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
	return <ScreenRecordingProvider>{children}</ScreenRecordingProvider>;
};

export default LayoutClient;
