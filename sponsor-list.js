/**
 * ./sponsor-list.js
 * Controls the sponsor list.
 * date: 2018-10-25 23:58
 * by: Leomar Durán <https://github.com/lduran2>
 */

 /*
 * For the purposes of this exercise, a League is a collection of, at the very least:
 * - A league name.
 * - A latitude/longitude pair.
 * - A single price to purchase their sponsorship opportunity.
 */

'use strict';

const leaguesystem = {};

(() => {
	const exports = leaguesystem;

	 /**
	  * Creates a team object for the league.
	  * @see #addTeam
	  */
	const newTeam = ((leagueName, latitude, longitude, price) => (
		{
			leagueName: leagueName,
			location: geopoints.newGeoPoint(latitude, longitude),
			price: price
		}
	));

	/**
	 * The league list.
	 */
	const League = [];

	/**
	 * Add a team to the league list.
	  * @params
	  *   $leagueName :string = the team name in the league
	  *   @(latitude, longitude) :[float,float] = the latitude/longitude pair
	  *   $price :BigDecimal = the price for sponsorship
	 */
	exports.addTeam = ((leagueName, latitude, longitude, price) => {
		League.push(newTeam(leagueName, latitude, longitude, price));
		console.log(League);
	});

	exports.findTeams = ((latitude, longitude, radius, budget) => {
		/* filter out teams too far from the location */
		const candidates = League.filter((el, k, arr) => (
			geopoints.distance(el.location, geopoints.newGeoPoint(latitude, longitude)) <= radius
		));
		console.log({candidates: candidates});
		let len = candidates.length;
		/* sort in ascending order */
		sort(candidates, len);
		console.log({sorted: candidates});
		const inBudget = [];
		let remainder = budget;
		// let previous = budget;

		/* find all prices under the budget */
		for (let k = 0, isUnderbudget = true; ((k < len) && isUnderbudget); ++k) {
			// previous = remainder;
			remainder -= candidates[k].price;
			isUnderbudget = (remainder >= 0);
			if (isUnderbudget) {
				inBudget.push(candidates[k]);
			} /* end if (isUnderbudget) */
		} /* next k */
		console.log(inBudget);

		return inBudget;
	});

	const sort = ((arr, len) => {
		for (let k = 1; k < len; ++k) {
			const temp = arr[k];
			let l = (k - 1);
			while ((l >= 0) && (arr[l].price > temp.price)) {
				arr[l + 1] = arr[l];
				--l;
			} /* end while ((l >= 0) && (arr[l].price > temp.price)) */
			arr[l + 1] = temp;
		} /* next k */
	});
})();

