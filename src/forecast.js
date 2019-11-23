const request = require('request');

const errors = {
  connect: 'Unable to connect to weather service.',
  location: 'Unable to find location.',
};

const forecast = (
  latitude,
  longitude,
  callback,
  units = 'si',
) => {
  const url = `https://api.darksky.net/forecast/${process.env.NWA_DARKSKY_API_KEY}/${latitude},${longitude}?units=${units}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(errors.connect, undefined);
    } else if (response.body.error) {
      callback(errors.location, undefined);
    } else {
      let forecast = `${response.body.daily.data[0].summary} \n`;
      forecast += `It is currently ${response.body.currently.temperature} degrees out. \n`;
      forecast += `This high today is ${response.body.daily.data[0].temperatureHigh} `;
      forecast += `with a low of ${response.body.daily.data[0].temperatureLow}. \n `;
      forecast += `There is a ${response.body.currently.precipProbability}% chance of rain. \n`;

      callback(undefined, forecast);
    }
  });
};

module.exports = forecast;
