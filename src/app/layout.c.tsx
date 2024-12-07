"use client";
import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";
const VideoRecProvider = dynamic(() => import("@/providers/VideoRecProvider"), {
	ssr: false, // Ensures it only runs client-side
});

interface ILayoutClientProps {
	children: ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
	return <VideoRecProvider>{children}</VideoRecProvider>;
};

export default LayoutClient;
