import React, { useEffect } from "react";

const GetEmotions = ({
	isFace,
	setIsFace,
	isRunning,
	setIsRunning,
	reset,
	happyCount,
	addSmileCount,
	seconds,
	setSeconds,
	setSpinner,
	showStart,
}) => {
	// init detection options
	let minConfidenceFace = 0.5;
	let faceapiOptions = new window.faceapi.SsdMobilenetv1Options({
		minConfidenceFace,
	});

	let video;
	let detections;
	let width = 360;
	let height = 280;
	let canvas, ctx;
	let videoElement = document.getElementById("vid");
	function timeout(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	let onExpression = (type) => {
		console.log(`("expression", {
      type: ${type},`);
	};

	const detectExpressions = () => {
		window.faceapi
			.detectSingleFace(videoElement, faceapiOptions)
			.withFaceExpressions()
			.then((result) => {
				setSpinner(false);
				// console.log(`${JSON.stringify(result)}`);
				if (typeof result === "undefined" && isFace) {
					// console.log("No face detected in camera");
					setIsFace(false);
				}
				if (typeof result !== "undefined") {
					setIsFace(true);
					if (seconds === 0 && !isRunning) {
						showStart();
					}
					let happiness = 0,
						anger = 0;

					if (result.expressions.hasOwnProperty("happy")) {
						happiness = result.expressions.happy;
						// console.log(`😃 = ${result.expressions.happy}`);
						if (happiness > 0.5 && isRunning) {
							// console.log("😃 😃😃😃😃😃😃😃😃😃😃😃😃😃");
							addSmileCount();
						}
					}
					if (result.expressions.hasOwnProperty("angry")) {
						anger = result.expressions.angry;
						if (anger > 0.07 && !isRunning && happyCount === 3) {
							onExpression("angry");
							reset();
						}
					}
				}
			});
	};
	useEffect(() => {
		let detectionNet = window.faceapi.nets.ssdMobilenetv1;
		detectionNet.load("/data/weights");
		window.faceapi.loadFaceExpressionModel("/data/weights");
		const asyncFn = async () => {
			video = await getVideo();
			canvas = createCanvas(width, height);
			ctx = canvas.getContext("2d");
			ctx.drawImage(video, 0, 0, width, height);
		};
		asyncFn();
	}, []);
	useEffect(() => {
		let interval = setInterval(() => {
			if (isRunning && isFace) {
				setSeconds((seconds) => seconds + 1);
			}
			detectExpressions();
		}, 1000);

		return () => clearInterval(interval);
	}, [seconds, isRunning, isFace]);

	async function getVideo() {
		videoElement = document.getElementById("vid");
		videoElement.width = width;
		videoElement.height = height;

		// Create a webcam capture
		const capture = await navigator.mediaDevices.getUserMedia({ video: true });
		videoElement.srcObject = capture;
		videoElement.play().then((res) => {
			// console.log("after video load");
		});

		return videoElement;
	}

	function createCanvas(w, h) {
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		document.body.appendChild(canvas);
		return canvas;
	}
	return <div></div>;
};

export default GetEmotions;
