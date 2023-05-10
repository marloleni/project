//--------------------------
let watch = (function () {
	let timer = document.getElementById("timer");
	let stop = document.getElementById("stop");
	let reset = document.getElementById("reset");
	let time = "00:00:00"
	let seconds = 0;
	let minutes = 0;
	let hours = 0;
	let t;

	timer.textContent = time;

	function buildTimer() {
		seconds++;
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
			if (minutes >= 60) {
				minutes = 0;
				seconds = 0;
				hours++;
			}
		}
		timer.textContent = (hours < 10 ? "0" + hours.toString() : hours) + ":" +
			(minutes < 10 ? "0" + minutes.toString() : minutes) + ":" +
			(seconds < 10 ? "0" + seconds.toString() : seconds);
	}
	function stopTimer() {
		stop.addEventListener("click", function () {
			clearTimeout(t);
		})
	}
	function startTimer() {
		start.addEventListener("click", function () {
			clearTimeout(t);
			t = setInterval(buildTimer, 1000);
		});
	}
	function resetTimer() {
		reset.addEventListener("click", function () {
			timer.textContent = time;
			seconds = 0; minutes = 0;
		});
	}
	return {
		start: startTimer(),
		stop: stopTimer(),
		reset: resetTimer()
	};
})()