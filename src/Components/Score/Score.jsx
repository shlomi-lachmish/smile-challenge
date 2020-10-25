import React, { useRef, useEffect, useState } from "react";
import "./style.css";
const Score = ({ smileCount, timeCount, isFace }) => {
	const [endGame, setEndGame] = useState(true);
	const smileScorePara = useRef(null);
	useEffect(() => {
		if (smileCount === 3) {
			smileScorePara.current.style.backgroundColor = "red";
			setEndGame(true);
		} else {
			setEndGame(false);
			smileScorePara.current.style.backgroundColor = "transparent";
		}
	}, [smileCount, timeCount]);
	return (
		<div>
			<div id="app-score">
				<p>Time score: {timeCount}</p>
				<p ref={smileScorePara}>Smile count is: {smileCount}</p>
				{endGame && <p>To try again make 😡 face</p>}
			</div>
			{!isFace && <p id="paused">Sorry challenge paused, I can't see your face</p>}
		</div>
	);
};

export default Score;
