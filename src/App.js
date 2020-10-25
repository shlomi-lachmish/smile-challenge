import React, { useState } from "react";
import "./App.css";
import wavUrl from "./gotcha.wav";
import Header from "./Components/Header/Header";
import Score from "./Components/Score/Score";
import Player from "./Components/Player/Player";
import GetEmotions from "./Services/GetEmotions/GetEmotions";
import ClipLoader from "react-spinners/ClipLoader";

const App = (props) => {
	const [happyCount, setHappyCount] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [isFace, setIsFace] = useState(true);
	const [seconds, setSeconds] = useState(0);
	const [spinner, setSpinner] = useState(true);
	const [video, setVideo] = useState(undefined);

	const reset = () => {
		if (video) {
			setSeconds(0);
			setHappyCount(0);
			setIsRunning(true);

			video.play();
		}
	};
	const showStart = () => {
		const boardElements = document.getElementById("boardElements");
		boardElements.classList = [];
	};
	const addSmileCount = () => {
		console.log("in addSmileCount fn");
		setHappyCount((previousCount) => {
			if (previousCount > 1 && isRunning) {
				document.getElementById("gotcha").play();
				console.log("gameOver");
				setIsRunning(false);
				return 3;
			}
			document.getElementById("gotcha").play();
			return previousCount + 1;
		});
	};

	const startGame = () => {
		console.log(`Let's start`);
		setIsRunning(true);
	};

	return (
		<div id="Container">
			<Header />
			{spinner && <ClipLoader size={150} color={"#123abc"} loading={true} />}
			{!spinner && (
				<Score smileCount={happyCount} timeCount={seconds} isFace={isFace} />
			)}
			{/* {seconds === 0 && <button onClick={startGame}> Start </button>} */}
			<div id="boardElements" className="hidden">
				<video id="vid" />
				<Player
					isRunning={isRunning}
					isFace={isFace}
					seconds={seconds}
					reset={reset}
					video={video}
					setVideo={setVideo}
				/>
				<GetEmotions
					isFace={isFace}
					setIsFace={setIsFace}
					isRunning={isRunning}
					setIsRunning={setIsRunning}
					reset={reset}
					happyCount={happyCount}
					addSmileCount={addSmileCount}
					seconds={seconds}
					setSeconds={setSeconds}
					setSpinner={setSpinner}
					showStart={showStart}
					video={video}
				/>
			</div>
			<audio id="gotcha" src={wavUrl} />
		</div>
	);
};

export default App;
