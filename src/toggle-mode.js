let darkMode = true;
const buttonToggle = document.getElementById('toggle-mode');

buttonToggle.addEventListener('click', (event) => {
	document.documentElement.classList.toggle('dark');
	console.log('click!');

	const mode = darkMode ? 'light' : 'dark';

	event.currentTarget.querySelector('span').textContent = `${mode} mode on`;

	darkMode = !darkMode;
});
