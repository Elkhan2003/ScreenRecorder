"use client";
import { FC } from "react";
import scss from "./VideoRec.module.scss";
import { useVideoRec } from "@/hooks/useVideoRec";

const VideoRec: FC = () => {
	const { status, startRecording, stopRecording, mediaBlobUrl } = useVideoRec();

	return (
		<section className={scss.VideoRec}>
			<div className="container">
				<div className={scss.content}>
					VideoRec
					<div>
						<p>{status}</p>
						<button onClick={startRecording}>Start Recording</button>
						<button onClick={stopRecording}>Stop Recording</button>
						<video src={mediaBlobUrl!} controls autoPlay loop />
					</div>
				</div>
			</div>
		</section>
	);
};

export default VideoRec;
