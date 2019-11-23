const request = require('request');

const errors = {
  connect: 'Unable to connect to location service.',
  location: 'Unable to find location. Try another search.',
};

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=${
    process.env.NWA_MAPBOX_API_KEY
  }&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(errors.connect, undefined);
    } else if (response.body.features.length === 0) {
      callback(errors.location, undefined);
    } else {
      const data = {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      };

      callback(undefined, data);
    }
  });
};

module.exports = geocode;
