module.exports = {
  device: {
    id: "",
    name: "Device"
  },
  apple: {
    id: "",
    password: ""
  },
  twilio: {
    accountSid: "",
    authToken: "",
    fromNumber: "",
    twiMlUrl: "",
    alerts: {
      sms: [],
      voice: []
    }
  },
  locating: {
    accuracy: 50,
    retries: 5,
    pauseMs: 1000 * 30
  },
  alertWhen: {
    darkMs: 1000 * 60 * 15,
    battery: 50
    // distance: {
    //   lat: 0,
    //   lng: 0,
    //   maxKm: 5
    // }
  }
};
