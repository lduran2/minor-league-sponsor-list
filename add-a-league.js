/**
 * ./add-a-league.js
 * Script for the add a league form
 * date: 2018-10-26 00:23
 * by: Leomar Durán <https://github.com/lduran2>
 */

 (() => {
	const addForm = document.getElementById('add-a-league');

	addForm.onsubmit = ((e) => {
		const leagueName = addForm['league-name'].value;
		const latitude = Number.parseFloat(addForm['latitude'].value);
		const longitude = Number.parseFloat(addForm['longitude'].value);
		const price = Number.parseFloat(priceNumber(addForm['price'].value));

		leaguesystem.addTeam(leagueName, latitude, longitude, price);
		return false;
	});

	const priceNumber = ((s) => (s.substring((s[0] === '$') ? 1 : 0).split(',').join('')));
})();