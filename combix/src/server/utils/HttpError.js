class HttpError extends Error {
    constructor(status = 500, ...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, HttpError);
      }
  
      this.status = status;
      this.date = new Date();
    }
  }
module.exports = HttpError;