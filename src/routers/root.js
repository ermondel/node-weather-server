const express = require('express');

const router = new express.Router();

router.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

router.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
  });
});

module.exports = router;
