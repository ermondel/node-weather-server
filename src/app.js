const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./geocode');
const forecast = require('./forecast');

const app = express();

const pathViews = '../templates/views';
const pathPublic = '../public';
const pathPartials = '../templates/partials';

app.set('views', path.join(__dirname, pathViews));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, pathPublic)));
hbs.registerPartials(path.join(__dirname, pathPartials));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
  });
});

app.get('/weather', (req, res) => {
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

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    message: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
