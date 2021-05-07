const HttpError = require('./HttpError');

const HttpErrorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).send(err.message);
  } else {
    // no se atrapo el error!  D:
    res.status(500).send('Internal server error');
  }
};

module.exports = HttpErrorHandler;
