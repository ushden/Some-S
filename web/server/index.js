const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');

const {resolve} = require('path');
const app = express();
const open = require('open');

app.use('/', express.static('public', {etag: false}));
app.use(favicon(path.join('public', 'icon.png')));

// In production, we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    console.log(err.message);

    return;
  }

  console.log(port, prettyHost)

  open(`http://${prettyHost}:${port}`);
});
