import state from './state.js';
import * as timer from './timer.js';
import * as el from './elements.js';
import * as sounds from './sounds.js';

export function toggleRunning() {
	state.isRunning = document.documentElement.classList.toggle('running');

	el.resetButton.classList.remove('disabled');

	timer.countDown();
	sounds.buttonPressAudio.play();
}

export function reset() {
	state.isRunning = false;
	el.resetButton.classList.add('disabled');
	// different: toggle -> remove ?
	document.documentElement.classList.remove('running');
	timer.updateDisplay();
}

export function setPlusFive() {
	el.entireTimer.classList.remove('horizontalShake');

	state.isRunning = false;
	document.documentElement.classList.remove('running');

	if (state.minutes < 60) {
		state.minutes = state.minutes + 5;
	} else {
		el.entireTimer.classList.remove('horizontalShake');
		setTimeout(() => {
			el.entireTimer.classList.add('horizontalShake');
		}, 10);
	}

	timer.updateDisplay();
}

export function setMinusFive() {
	el.entireTimer.classList.remove('horizontalShake');

	state.isRunning = false;
	document.documentElement.classList.remove('running');

	if (state.minutes > 0) {
		state.minutes = state.minutes - 5;
	} else {
		el.entireTimer.classList.remove('horizontalShake');
		setTimeout(() => {
			el.entireTimer.classList.add('horizontalShake');
		}, 10);
	}

	timer.updateDisplay();
}

function pauseOtherSounds() {
	Object.values(sounds.bgAudio).forEach((audio) => {
		if (audio instanceof Audio) {
			audio.pause();
		}
	});
}

function activateButton() {
	let selectedButton = event.target;

	Object.values(el.mscBtn).forEach((button) => {
		if (button !== selectedButton) {
			button.classList.remove('btnActive');
		}
	});

	selectedButton.classList.toggle('btnActive');
}

let currentPlayingAudio = null
let activeButton = null;


export function toggleMusic(event) {
	const selectedButton = event.target;
	const className = selectedButton.classList[1];

	if (selectedButton === activeButton) {
			if (currentPlayingAudio) {
					currentPlayingAudio.pause();
					currentPlayingAudio.currentTime = 0;
					currentPlayingAudio = null;
					activeButton.classList.remove('btnActive');
					activeButton = null;
			}
	} else {
			activateButton(selectedButton);
			if (currentPlayingAudio) {
					currentPlayingAudio.pause();
					currentPlayingAudio.currentTime = 0;
			}

			switch (className) {
					case 'ph-coffee':
							currentPlayingAudio = sounds.bgAudio.audioCafe;
							break;
					case 'ph-fire':
							currentPlayingAudio = sounds.bgAudio.audioFire;
							break;
					case 'ph-tree-evergreen':
							currentPlayingAudio = sounds.bgAudio.audioForest;
							break;
					case 'ph-cloud-rain':
							currentPlayingAudio = sounds.bgAudio.audioRain;
							break;
					default:
							alert('Unknown action');
							return;
			}

			if (currentPlayingAudio) {
					currentPlayingAudio.play();
			}

			activeButton = selectedButton;
	}
}

Object.values(el.mscBtn).forEach((button) => {
	button.addEventListener('click', toggleMusic);
});
