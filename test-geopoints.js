/**
 * ./test-geopoints.js
 * Tests geopoints.js
 * date: 2018-10-25 21:32
 * by: Leomar Durán <https://github.com/lduran2>
 */

'use strict';

(() => {
	/* string coordinates between Philadelphia City Hall and Empire State Building */
	const sPhillyCityHall = ['39°57\'8.62"N', '75°9\'48.95"W'];
	const sEmpireStateBuilding = ['40°44\'54.36"N', '73°59\'8.36"W'];

	/* returns point object from DMS point */
	function geoPointFromDms(dmsPoint) {
		return geopoints.newGeoPoint(geopoints.dmsToDegrees(dmsPoint[0]), geopoints.dmsToDegrees(dmsPoint[1]));
	}

	/* geographic points between Philadelphia City Hall and Empire State Building */
	const pPhillyCityHall = geoPointFromDms(sPhillyCityHall);
	const pEmpireStateBuilding = geoPointFromDms(sEmpireStateBuilding);

	const referenceSite = 'https://www.movable-type.co.uk/scripts/latlong.html';
	const expectedDistance = 82.89 /* miles */;
	const acceptedError = 0.05;

	/* calculate */
	const foundDistance = geopoints.distance(pPhillyCityHall, pEmpireStateBuilding);
	const rateError = ((foundDistance - expectedDistance)/expectedDistance);

	/* message to print */
	const m = [];

	const pResult = document.getElementById('result');

	m.push('The location of the Philadelphia City Hall is ');
	m.push(sPhillyCityHall[0]);
	m.push(' ');
	m.push(sPhillyCityHall[1]);
	m.push(', ');
	m.push(JSON.stringify(pPhillyCityHall));
	m.push('.\n\n');

	m.push('The location of the Empire State Building is ');
	m.push(sEmpireStateBuilding[0]);
	m.push(' ');
	m.push(sEmpireStateBuilding[1]);
	m.push(', ');
	m.push(JSON.stringify(pEmpireStateBuilding));
	m.push('.\n\n');

	m.push('The reference distance is ');
	m.push(expectedDistance);
	m.push(' miles, according to <')
	m.push(referenceSite);
	m.push('>.\n\n');

	m.push('The experimental distance is ');
	m.push(foundDistance);
	m.push(' miles.\n\n');

	m.push('The rate of error is ');
	m.push(rateError);
	m.push(', ');

	if (Math.abs(rateError) <= acceptedError) {
		m.push('within')
	}
	else {
		m.push('outside of')
	}

	m.push(' the acceptable margin of ');
	m.push(acceptedError);
	m.push('.');

	pResult.appendChild(document.createTextNode(m.join('')));
})();