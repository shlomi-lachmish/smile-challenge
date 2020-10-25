import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import "./style.css";
const Player = ({ isRunning, isFace, seconds, reset, video, setVideo }) => {
	const playerRef = useRef(null);
	const startVid = () => {
		console.log("startVid");
		if (video) {
			video.play();
			reset();
		}
	};
	const onReady = (event) => {
		debugger;
		setVideo(() => event.player.player);
	};
	useEffect(() => {
		if (video) {
			isRunning && isFace ? video.play() : video.pause();
		}
	}, [isRunning]);
	return (
		<div onClick={startVid}>
			<ReactPlayer
				onReady={onReady}
				ref={playerRef}
				playing={false}
				muted={false}
				controls={false}
				loop={true}
				url="https://www.youtube.com/watch?v=ivmBE6MQ00Y"
				width="98vw"
				height="90vh"
				style={{ margin: "20px" }}
				onClick={startVid}
				onError={(e) => console.log("onError", e)}
				onStart={() => {
					console.log("onStart");
					startVid();
				}}
			/>
		</div>
	);
};

export default Player;
