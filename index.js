const tryTimes = require("./src/tryTimes");
const find = require("./src/find");
const distance = require("./src/distance");
const notify = require("./src/notify");
const config = require("./config");

(async () => {
  const { device, darkMinutes } = await tryTimes(
    config.locating.retries,
    config.locating.pauseMs,
    async () => {
      const device = await find(config);
      const now = new Date().getTime();
      const dark = now - device.location.timeStamp;
      const darkMinutes = Math.round(dark / 1000 / 60);

      if (now - device.location.timeStamp > config.alertWhen.darkMs) {
        throw new Error(`Device is dark since ${darkMinutes} minutes`);
      }

      return { device, darkMinutes };
    }
  );

  const accuracy =
    (device.location.horizontalAccuracy + device.location.verticalAccuracy) / 2;

  const batteryPercent = Math.round(device.batteryLevel * 100);
  if (batteryPercent < config.alertWhen.battery) {
    throw new Error(`Devices battery is at ${batteryPercent} percent`);
  }

  const distanceKm =
    config.alertWhen.distance &&
    Math.round(
      distance(
        device,
        config.alertWhen.distance.lat,
        config.alertWhen.distance.lng
      ) * 100
    ) / 100;
  if (
    config.alertWhen.distance &&
    distanceKm > config.alertWhen.distance.maxKm
  ) {
    throw new Error(`Device is ${distanceKm} kilometers away.`);
  }

  console.log("OK", {
    battery: `${batteryPercent}%`,
    distance: distanceKm && `${distanceKm}km`,
    accuracy: `${accuracy}m`,
    lastUpdate: `${darkMinutes}min ago`
  });
})()
  .catch(notify(config))
  .catch(err => console.error(err) && process.exit(1));
