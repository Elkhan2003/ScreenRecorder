"use client";
import dynamic from "next/dynamic";
const VideoPage = dynamic(() => import("@/components/pages/VideoPage"), {
	ssr: false,
});
const page = () => {
	return <VideoPage />;
};
export default page;
