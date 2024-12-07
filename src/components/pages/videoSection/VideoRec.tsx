"use client";
import { FC } from "react";
import scss from "./VideoRec.module.scss";
import { useVideoRec } from "@/hooks/useVideoRec";
import axios from "axios";

const VideoRec: FC = () => {
	const { status, startRecording, stopRecording, mediaBlobUrl } = useVideoRec();

	const uploadVideoFile = async () => {
		try {
			if (!mediaBlobUrl) {
				alert("No video to upload");
				return;
			}

			const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
			const file = new File([blob], "video.webm", { type: "video/webm" });

			const formData = new FormData();
			formData.append("file", file);

			const { data } = await axios.post(
				"https://api.elchocrud.pro/api/v1/upload/file",
				formData
			);

			alert("Video uploaded successfully: " + data.url);
		} catch (error) {
			console.error("Error uploading video:", error);
			alert("Failed to upload video. Please try again.");
		}
	};

	return (
		<section className={scss.VideoRec}>
			<div className="container">
				<div className={scss.content}>
					<h1>VideoRec</h1>
					<div>
						<p>Status: {status}</p>
						<button onClick={startRecording}>Start Recording</button>
						<button onClick={stopRecording}>Stop Recording</button>
						<button onClick={uploadVideoFile}>Upload Video</button>
						{mediaBlobUrl && (
							<video src={mediaBlobUrl} controls autoPlay loop />
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default VideoRec;
