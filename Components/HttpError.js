const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

// class Error {
//   constructor(message) {
//     this.message = message;
//   }
// }

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = BAD_REQUEST;
  }
}

class ObjectNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "ObjectNotFound";
    this.status = NOT_FOUND;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
    this.status = SERVER_ERROR;
  }
}

module.exports = {
  ValidationError
};

//`Переданы некорректные данные. ${errors._message}`