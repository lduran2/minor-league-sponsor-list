/**
 * ./parse-stdin.js
 * Parses the STDIN for easier testing
 * date: 2018-10-26 00:07
 * by: Leomar Durán <https://github.com/lduran2>
 */

 (() => {
	const stdinForm = document.getElementById('parse-stdin');
	if (!stdinForm) return;

	const addForm = document.getElementById('add-a-league');
	const findForm = document.getElementById('find-leagues');

	stdinForm.onsubmit = ((e) => {
		/* array of stdin lines */
		const stdinLines = stdinForm['stdin'].value.split('\n');
		/* number of teams */
		const nTeams = Number.parseFloat(stdinLines.shift());
		/* submit all team adds */
		for (let k = nTeams; ((k--) > 0); ) {
			addForm['league-name'].value = stdinLines.shift();
			addForm['latitude'].value = stdinLines.shift();
			addForm['longitude'].value = stdinLines.shift();
			addForm['price'].value = stdinLines.shift();
			addForm.onsubmit(e);
		}

		findForm['latitude'].value = stdinLines.shift();
		findForm['longitude'].value = stdinLines.shift();
		findForm['radius'].value = stdinLines.shift();
		findForm['budget'].value = stdinLines.shift();
		findForm.onsubmit(e);

		return false;
	});
})();
