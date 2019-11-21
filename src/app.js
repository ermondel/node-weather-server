const express = require('express');
const path = require('path');
const hbs = require('hbs');

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
  res.send({
    forecast: 'It is snowing.',
    location: 'Antarctica',
  });
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
