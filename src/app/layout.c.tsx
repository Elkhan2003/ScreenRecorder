"use client";
import { FC, ReactNode } from "react";
import dynamic from "next/dynamic";
const ScreenRecordingProvider = dynamic(
	() => import("@/providers/ScreenRecordingProvider"),
	{
		ssr: false, // Ensures it only runs client-side
	}
);

interface ILayoutClientProps {
	children: ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
	return <ScreenRecordingProvider>{children}</ScreenRecordingProvider>;
};

export default LayoutClient;
