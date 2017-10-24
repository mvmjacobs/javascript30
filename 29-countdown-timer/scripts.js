let countdown;
const timerDisplay = document.querySelector('.display-time-left');
const endTime = document.querySelector('.display-end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	clearInterval(countdown);
	const now = Date.now();
	const then = now + (seconds * 1000);

	displayEndTime(then);
	displayTimeLeft(seconds);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		displayTimeLeft(secondsLeft);
		if (secondsLeft <= 0) {
			clearInterval(countdown);
			setTimeout(() => timerDisplay.textContent = '', 500);
			setTimeout(() => timerDisplay.textContent = '00:00:00', 700);
			document.title = 'Timer';
			return;
		}
	}, 1000);
}

function displayTimeLeft(seconds) {
	let remainderSeconds = seconds;

	const hours = Math.floor(remainderSeconds / 3600);
	remainderSeconds = remainderSeconds % 3600;

	const mins = Math.floor(remainderSeconds / 60);
	remainderSeconds = remainderSeconds % 60;

	const display = `${(hours < 10 ? '0' : '') + hours}:${(mins < 10 ? '0' : '') + mins}:${(remainderSeconds < 10 ? '0' : '') + remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = 'Timer | ' + display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${(minutes < 10 ? '0' : '') + minutes}`;
}

function startTime() {
	timer(parseInt(this.dataset.time));
}

buttons.forEach((button) => button.addEventListener('click', startTime));
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	timer(this.minutes.value * 60);
	this.reset();
});
