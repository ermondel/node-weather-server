const express = require('express');
const path = require('path');
const hbs = require('hbs');
const rootRouter = require('./routers/root');
const weatherRouter = require('./routers/weather');
const s404 = require('./routers/s404');

const app = express();

const port = process.env.PORT || 3000;

const pathViews = '../templates/views';
const pathPublic = '../public';
const pathPartials = '../templates/partials';

hbs.registerHelper('getCurrentYear', () =>
  new Date().getFullYear(),
);
app.set('views', path.join(__dirname, pathViews));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, pathPublic)));
hbs.registerPartials(path.join(__dirname, pathPartials));
app.use(rootRouter);
app.use(weatherRouter);
app.use(s404);

app.listen(port, () => {
  console.log('[app]', 'OK', 'Server is up on port', port);
});
