const express = require('express');

const router = new express.Router();

router.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    message: 'Help article not found',
  });
});

router.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
  });
});

module.exports = router;
