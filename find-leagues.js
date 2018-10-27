/**
 * ./find-leagues.js
 * Script for find league form
 * date: 2018-10-26 T00:18
 * by: Leomar Durán <https://github.com/lduran2>
 */
(() => {
	const findForm = document.getElementById('find-leagues');
	const resultsForm = document.getElementById('findings');

	findForm.onsubmit = ((e) => {
		const latitude = Number.parseFloat(findForm['latitude'].value);
		const longitude = Number.parseFloat(findForm['longitude'].value);
		const radius = Number.parseFloat(findForm['radius'].value);
		const budget = Number.parseFloat(priceNumber(findForm['budget'].value));

		const results = leaguesystem.findTeams(latitude, longitude, radius, budget);

		resultsForm['teams'].value = results.map((el, k, arr) => (el.leagueName)).join('\n');
		resultsForm['cost'].value = formatPrice(results.reduce((acc, el, k, arr) => (acc + el.price), 0));

		return false;
	});

	resultsForm.onsubmit = ((e) => false);

	const priceNumber = ((s) => (s.substring((s[0] === '$') ? 1 : 0).split(',').join('')));

	const formatPrice = ((n) => {
		const s = ('' + n);
		let iDecimal = s.indexOf('.');
		if (iDecimal < 0) {
			iDecimal = s.length;
		}
		const m = [];
		for (let k = iDecimal; (k > 0); k -= 3) {
			m.unshift(s.substring(max0(k - 3), k));
		}
		return ('$' + m.join(',') + s.substring(iDecimal));
	});

	const max0 = ((n) => ((n > 0) ? n : 0));
})();