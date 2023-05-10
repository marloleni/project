document.addEventListener('mousemove', stare);

function stare(event) {
	const cursorPosition = {
		x: event.pageX,
		y: event.pageY
	};
	const eyeInBlackList = document.querySelectorAll('.eye-in-black');

	eyeInBlackList.forEach(eyeInBlack => {
		lookTo(eyeInBlack, cursorPosition);
	});
}

function lookTo(eyeInBlack, cursorPosition) {
	const eyeInBlackOffset = eyeInBlack.offsetWidth;
	const white = eyeInBlack.parentNode;
	white.style.transform = 'rotate(0deg)';

	const whiteRadius = white.offsetWidth / 2;
	const whiteTop = white.getBoundingClientRect().top;
	const whiteLeft = white.getBoundingClientRect().left;

	const cursorX = cursorPosition.x;
	const cursorY = cursorPosition.y;

	const x0New = cursorX - whiteRadius - whiteLeft;
	const y0New = cursorY - whiteRadius - whiteTop;

	const distanceToCursor = Math.sqrt(x0New * x0New + y0New * y0New) + eyeInBlackOffset / 2;

	if (distanceToCursor <= whiteRadius) {
		eyeInBlack.style.top = cursorY - eyeInBlackOffset / 2 - whiteTop + 'px';
		eyeInBlack.style.left = cursorX - eyeInBlackOffset / 2 - whiteLeft + 'px';
	} else {
		const rotationAngle = (x, y) => {
			if (x >= 0) {
				return (Math.atan(y / x) * 180) / Math.PI;
			} else {
				return (Math.atan(y / x) * 180) / Math.PI - 180;
			}
		};

		eyeInBlack.style.top = whiteRadius - eyeInBlackOffset / 2 + 'px';
		eyeInBlack.style.left = whiteRadius * 2 - eyeInBlackOffset + 'px';
		white.style.transform = 'rotate(' + rotationAngle(x0New, y0New) + 'deg)';
	}
}

//--------------------
//footer open or close
const footer = document.querySelector(`footer`);
const footerOpenButton = document.querySelector(`.footer-open-button`);
const footerCloseButton = document.querySelector(`.footer-close-button`);

footerOpenButton.addEventListener(`click`, toggleFooter);
footerCloseButton.addEventListener(`click`, toggleFooter);

function toggleFooter() {
	footer.classList.toggle(`_active`);
	footerOpenButton.classList.toggle(`_active`);
}
//-------------------
// left side close or open
const leftWrap = document.querySelector('.wrap-left');
const rightWrap = document.querySelector('.wrap-right');
const leftWrapCloseButton = document.querySelector('.wrap-left-close-button');
const leftWrapOpenButton = document.querySelector('.wrap-left-open-button');

let isLeftWrapClosed = false;

function toggleLeftWrap() {
	isLeftWrapClosed = !isLeftWrapClosed;
	leftWrap.classList.toggle('_leftClosed', isLeftWrapClosed);
	leftWrapOpenButton.classList.toggle('_leftClosed', isLeftWrapClosed);
	rightWrap.classList.toggle('_leftClosed', isLeftWrapClosed);
}

leftWrapCloseButton.addEventListener('click', toggleLeftWrap);
leftWrapOpenButton.addEventListener('click', toggleLeftWrap);

//------------------------
//calc open or close
const calculatorButton = document.querySelector(`.calculator-button`)
const calculatorCloseButton = document.querySelector(`.calc-titleBar-close-button`)

calculatorButton.addEventListener(`click`, calcOpenClose)
calculatorCloseButton.addEventListener(`click`, calcOpenClose)

function calcOpenClose() {
	const calc_app = document.querySelector(`.calc-app`)
	calc_app.classList.toggle(`_active`)
}

//------------------------
//stopWatch open or close
const stopWatchButton = document.querySelector(`.stopWatch-button`)
const stopWatchCloseButton = document.querySelector(`.stWatch-titleBar-close-button`)

stopWatchButton.addEventListener(`click`, stpWatchOpenClose)
stopWatchCloseButton.addEventListener(`click`, stpWatchOpenClose)

function stpWatchOpenClose() {
	const stpWatch_app = document.querySelector(`.stWatch-app`)
	stpWatch_app.classList.toggle(`_active`)
}

//---------------------------
//weather open or close
const weatherButton = document.querySelector(`.weather-button`)
// const weatherCloseButton = document.querySelector(`.weather-titleBar-close-button`)

weatherButton.addEventListener(`click`, weatherOpenClose)
// weatherCloseButton.addEventListener(`click`, weatherOpenClose)

function weatherOpenClose() {
	const weather_app = document.querySelector(`.weather-app`)
	weather_app.classList.toggle(`_active`)
}

//---------------------------
//move utilities
stopWatchButton.addEventListener('click', () => {
	move('.stWatch-titleBar', '.stWatch-app');
})
calculatorButton.addEventListener('click', () => {
	move('.calc-titleBar', '.calc-app');
})
weatherButton.addEventListener(`click`, () => {
	move('.weather-titleBar', '.weather-app');
})

leftWrapOpenButton.addEventListener(`click`, function () {
	const app = document.querySelector(`.app`)
	app.classList.toggle(`_leftOpen`)
})

function move(titleBarSelector, appSelector) {
	const titlebar = document.querySelector(titleBarSelector);
	const windowEl = document.querySelector(appSelector);
	const parentEl = windowEl.parentNode;
	let isDragging = false;
	let initialX;
	let initialY;
	let xOffset = 0;
	let yOffset = 0;
	let maxXOffset;
	let maxYOffset;

	titlebar.addEventListener('mousedown', dragStart);
	document.addEventListener('mouseup', dragEnd);
	document.addEventListener('mousemove', drag);
	window.addEventListener('resize', onWindowResize);

	function dragStart(e) {
		if (e.target === titlebar) {
			isDragging = true;
			initialX = e.clientX - xOffset;
			initialY = e.clientY - yOffset;
			maxXOffset = parentEl.clientWidth - windowEl.clientWidth;
			maxYOffset = parentEl.clientHeight - windowEl.clientHeight;
		}
	}

	function dragEnd() {
		isDragging = false;
	}

	function drag(e) {
		if (isDragging) {
			e.preventDefault();
			xOffset = Math.min(Math.max(e.clientX - initialX, 0), maxXOffset);
			yOffset = Math.min(Math.max(e.clientY - initialY, 0), maxYOffset);
			setTranslate(xOffset, yOffset, windowEl);
		}
	}

	function setTranslate(xPos, yPos, el) {
		el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
	}

	function onWindowResize() {
		if (xOffset + windowEl.offsetWidth > window.innerWidth) {
			xOffset = parentEl.clientWidth - windowEl.clientWidth;
			setTranslate(xOffset, yOffset, windowEl);
		}
	}

}

//--------------------------
//login page
const loginButton = document.querySelector(`.log-in`)
const signinButton = document.querySelector(`.sign-in`)

loginButton.addEventListener(`click`, loginOpenClose)
signinButton.addEventListener(`click`, loginOpenClose)
const loginPage = document.querySelector(`.loginRegPage`)

function loginOpenClose() {
	loginPage.classList.toggle(`_active`)
}
function regOpenClose() {
	// const stpWatch_app = document.querySelector(`.stWatch-app`)
	// stpWatch_app.classList.toggle(`_active`)
}

loginPage.addEventListener(`click`, function (event) {
	if (!event.target.closest(`.login-box`))
		loginPage.classList.remove(`_active`)
})