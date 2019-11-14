const { findmyphone } = require("find-my-iphone");

module.exports = function find(config, retry = 0) {
  findmyphone.apple_id = config.apple.id;
  findmyphone.password = config.apple.password;

  return new Promise((resolve, reject) => {
    findmyphone.getDevices((err, devices) => {
      delete findmyphone.apple_id;
      delete findmyphone.password;
      if (err) {
        return reject(err);
      }

      const device = devices.find(({ id }) => id === config.device.id);

      if (!device) {
        return reject(new Error(`Device does not seem to exist`));
      }

      if (!device.location || !device.location.locationFinished) {
        return reject(new Error("Could not find Device"));
      }

      if (
        device.location.horizontalAccuracy > config.locating.accuracy ||
        device.location.verticalAccuracy > config.locating.accuracy
      ) {
        return reject(new Error("Bad accuracy of Devices location"));
      }

      resolve(device);
    });
  });
};
