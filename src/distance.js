const { findmyphone } = require("find-my-iphone");

function degreeToRadians(degrees = 0) {
  // Math.PI / 180
  if (isNaN(degrees)) {
    throw new Error("Must input valid number for degrees");
  }

  return degrees * 0.017453292519943295;
}

// This implementation originally appeared at http://www.movable-type.co.uk/scripts/latlong.html
// Courtesy of @chrisveness
function distanceInKm(lat1, lon1, lat2, lon2) {
  // A = sin²(Δφ/2) + cos(φ1)⋅cos(φ2)⋅sin²(Δλ/2)
  // δ = 2·atan2(√(a), √(1−a))
  // see mathforum.org/library/drmath/view/51879.html for derivation

  const sine = num => Math.sin(num / 2);
  const cos = num => Math.cos(num);

  const radius = 6371;
  const φ1 = degreeToRadians(lat1);
  const λ1 = degreeToRadians(lon1);
  const φ2 = degreeToRadians(lat2);
  const λ2 = degreeToRadians(lon2);
  const Δφ = φ2 - φ1;
  const Δλ = λ2 - λ1;

  const a = sine(Δφ) * sine(Δφ) + cos(φ1) * cos(φ2) * Math.pow(sine(Δλ), 2);
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * radius;
}

module.exports = function distance(device, lat, lng) {
  return distanceInKm(
    device.location.latitude,
    device.location.longitude,
    lat,
    lng
  );
};
