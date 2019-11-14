const twilio = require("twilio");

module.exports = function notify(config) {
  return error => {
    const client = twilio(config.twilio.accountSid, config.twilio.authToken);
    const message = error.message.replace(/device/i, config.device.name);
    console.error("Notifying:", message);

    return Promise.all(
      config.twilio.alerts.sms
        .map(number => {
          return client.messages.create({
            body: message,
            from: config.twilio.fromNumber,
            to: number
          });
        })
        .concat(
          config.twilio.alerts.voice.map(number => {
            client.calls.create({
              url: `${config.twilio.twiMlUrl}?message=${encodeURIComponent(
                message
              )}`,
              from: config.twilio.fromNumber,
              to: number
            });
          })
        )
    );
  };
};
