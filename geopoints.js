/**
 * ./geopoints.js
 * Operations on geographical coordinate points
 * date: 2018-10-25 21:30
 * by: Leomar Durán <https://github.com/lduran2>
 */

'use strict';

const geopoints = {};

(() => {
	const exports = geopoints;

	exports.dmsToDegrees = ((dms) => {
		/* split up the dms string using the units */
		const divDeg = dms.split('°');
		const divMin = divDeg[1].split("'");
		const divSec = divMin[1].split('"');
		/* parse the splits */
		const deg = Number.parseFloat(divDeg[0]);
		const min = Number.parseFloat(divMin[0]);
		const sec = Number.parseFloat(divSec[0]);
		/* calculate the degrees */
		const abs = (deg + ((min + (sec/60))/60));
		/* South and West degrees are negative,
		 * <https://www.ubergizmo.com/how-to/read-gps-coordinates/> */
		let degrees = abs;

		if ((divSec[1]==='S') || (divSec[1]==='W')) {
			degrees = -abs;
		} /* end if ((divSec[1]==='S') || (divSec[1]==='W')) */
		return degrees;
	});

	exports.newGeoPoint = ((latitude, longitude) => (
		{
			latitude: latitude,
			longitude: longitude
		}
	));

	/** The radius of the earth */
	const R = 3958.761 /* statute miles */

	/**
	 * Returns the distance between two geographical points.
	 *
	 * Calculates by converting the colatitude and longitude to Cartesian
	 * and applying the distance formula.
	 */
	exports.distance = ((point1, point2) => {
		/* convert to radians, using colatitude, (θ = 90° - φ_{deg}) */
		const θ1 = toRadians(90 - point1.latitude);
		const θ2 = toRadians(90 - point2.latitude);
		const λ1 = toRadians(point1.longitude);
		const λ2 = toRadians(point2.longitude);

		/* difference in from spherical to Cartesian, using r = 1 */
		const dX = ((Math.sin(θ2)*Math.cos(λ2)) - (Math.sin(θ1)*Math.cos(λ1)));
		const dY = ((Math.sin(θ2)*Math.sin(λ2)) - (Math.sin(θ1)*Math.sin(λ1)));
		const dZ = (Math.cos(θ2) - Math.cos(θ1));

		/* distance formula, using r = 1 */
		const d = Math.sqrt((dX*dX) + (dY*dY) + (dZ*dZ));
		/* distance using R for radius */
		const D = R*d;

		return D;
	});

	/**
	 * Converts the unit of $deg from degrees to radians
	 */
	const toRadians = ((deg) => ((deg * 2 * Math.PI)/360));
})();
