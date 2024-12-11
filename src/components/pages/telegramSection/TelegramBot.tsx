"use client";
import { FC } from "react";
import scss from "./TelegramBot.module.scss";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useVideoRec } from "@/hooks/useVideoRec";

interface ITelegramForm {
	title: string;
}

const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

const TelegramBot: FC = () => {
	const { mediaBlobUrl } = useVideoRec();
	const { register, handleSubmit } = useForm<ITelegramForm>();

	const onSubmit: SubmitHandler<ITelegramForm> = async (data) => {
		if (!mediaBlobUrl) {
			alert("Video is not recorded yet.");
			return;
		}

		try {
			const response = await fetch(mediaBlobUrl);
			const blob = await response.blob();

			const formData = new FormData();
			formData.append("chat_id", CHAT_ID!);
			formData.append("video", blob, `${data.title || "video"}.mp4`);
			formData.append("caption", data.title || "No title provided");

			await axios.post(
				`https://api.telegram.org/bot${TOKEN}/sendVideo`,
				formData
			);

			alert("Video uploaded successfully!");
		} catch (error) {
			console.error("Error uploading video:", error);
			alert("Failed to upload video.");
		}
	};

	return (
		<section className={scss.TelegramBot}>
			<div className="container">
				<div className={scss.content}>
					<h1>TelegramBot</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							type="text"
							placeholder="Enter your title..."
							{...register("title")}
						/>
						<button type="submit">Upload Video in Telegram</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default TelegramBot;
