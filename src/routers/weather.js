const express = require('express');
const geocode = require('../geocode');
const forecast = require('../forecast');

const router = new express.Router();

router.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.',
    });
  }

  const address = req.query.address;

  geocode(
    address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });

        return res.send({
          forecast: forecastData,
          location,
          address,
        });
      });
    },
  );
});

module.exports = router;
