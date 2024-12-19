"use client";
import React, { FC, createContext, useState, ReactNode, useRef } from "react";

type RecordingStatus = "not started" | "recording" | "stopped" | "error";

export const ScreenRecordingContext = createContext<{
	startRecording: () => Promise<void>;
	stopRecording: () => void;
	downloadRecording: () => void;
	mediaBlobUrl: string | null;
	status: RecordingStatus;
} | null>(null);

const ScreenRecordingProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
	const [status, setStatus] = useState<RecordingStatus>("not started");
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	if (!MediaRecorder.isTypeSupported("video/mp4")) {
		console.warn("Формат Mp4 может не поддерживаться в этом браузере.");
	}

	const startRecording = async () => {
		try {
			// Запрашиваем доступ к экрану и микрофону
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
			});
			const audioStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			// Объединяем видео и аудио потоки
			const combinedStream = new MediaStream([
				...stream.getVideoTracks(),
				...audioStream.getAudioTracks(),
			]);
			// Создаём MediaRecorder для записи
			const mediaRecorder = new MediaRecorder(combinedStream, {
				mimeType: "video/mp4",
			});
			mediaRecorderRef.current = mediaRecorder;
			// Слушаем события dataavailable для сбора данных
			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			};
			// Когда запись остановлена, создаём Blob URL
			mediaRecorder.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: "video/mp4" });
				const url = URL.createObjectURL(blob);
				setMediaBlobUrl(url);
				setStatus("stopped"); // Обновляем статус на "stopped"
				chunksRef.current = []; // Очищаем данные для новой записи
			};
			// Начинаем запись
			setStatus("recording");
			mediaRecorder.start();
		} catch (error) {
			console.error("Ошибка при запуске записи экрана и микрофона:", error);
			setStatus("error");
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			mediaRecorderRef.current.stream
				.getTracks()
				.forEach((track) => track.stop());
			mediaRecorderRef.current = null;
			setStatus("stopped");
		}
	};

	const downloadRecording = () => {
		if (mediaBlobUrl) {
			const a = document.createElement("a");
			a.href = mediaBlobUrl;
			a.download = "recording.mp4";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else {
			console.warn("Нет доступной записи для скачивания.");
		}
	};

	return (
		<ScreenRecordingContext.Provider
			value={{
				startRecording,
				stopRecording,
				downloadRecording,
				mediaBlobUrl,
				status,
			}}>
			{children}
		</ScreenRecordingContext.Provider>
	);
};

export default ScreenRecordingProvider;

/*
Теперь в контексте доступен `status`, который может принимать следующие значения:
- `"not started"` — запись не начата.
- `"recording"` — запись идет.
- `"stopped"` — запись остановлена.
- `"error"` — произошла ошибка при записи.
*/
