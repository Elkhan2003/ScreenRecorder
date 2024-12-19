"use client";
import { FC, useState } from "react";
import scss from "./VideoRec.module.scss";
import axios from "axios";
import { useScreenRecording } from "@/hooks/useScreenRecording";

const VideoRec: FC = () => {
	const {
		status,
		startRecording,
		stopRecording,
		mediaBlobUrl,
		downloadRecording,
	} = useScreenRecording();
	const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const uploadVideoFile = async () => {
		try {
			if (!mediaBlobUrl) {
				alert("No video to upload");
				return;
			}

			const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
			const file = new File([blob], "video.mp4", { type: "video/mp4" });

			const formData = new FormData();
			formData.append("file", file);

			const { data } = await axios.post(
				"https://api.elchocrud.pro/api/v1/upload/file",
				formData
			);

			setUploadedVideoUrl(data.url);
			alert("Video uploaded successfully: " + data.url);
		} catch (error) {
			console.error("Error uploading video:", error);
			alert("Failed to upload video. Please try again.");
		}
	};

	const openUploadedVideo = () => {
		if (uploadedVideoUrl) {
			window.open(uploadedVideoUrl, "_blank");
		}
	};

	return (
		<section className={scss.VideoRec}>
			<div className="container">
				<div className={scss.content}>
					<h1>VideoRec</h1>
					<div>
						<div>
							<p>Status: {status}</p>
							<input
								type="text"
								placeholder="Enter title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<textarea
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div>
							{(status === "not started" || status === "stopped") && (
								<>
									<button onClick={startRecording}>Start Recording</button>
								</>
							)}
							{status === "recording" && (
								<>
									<button onClick={stopRecording}>Stop Recording</button>
								</>
							)}
							{status === "stopped" && (
								<>
									<button onClick={uploadVideoFile}>Upload Recording</button>
									<button onClick={downloadRecording}>
										Download Recording
									</button>
								</>
							)}
						</div>
					</div>
					{mediaBlobUrl && <video src={mediaBlobUrl} controls autoPlay loop />}
					{uploadedVideoUrl && (
						<button onClick={openUploadedVideo}>Open Uploaded Video</button>
					)}
				</div>
			</div>
		</section>
	);
};

export default VideoRec;
