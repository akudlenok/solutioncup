import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_REQUEST_TIMEOUT = 408;
const HTTP_STATUS_VALIDATION_ERROR = 422;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const DELETE_REQUEST_METHOD = 'DELETE';
const PUT_REQUEST_METHOD = 'PUT';
const POST_REQUEST_METHOD = 'POST';

const ERROR_RESPONSE_STATUSES = [
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_REQUEST_TIMEOUT,
];

export const rtkQueryErrorLogger: Middleware =
  ({ dispatch, getState }: MiddlewareAPI) =>
  next => {
    return action => {
      if (!isRejectedWithValue(action)) {
        return next(action);
      }

      const { status, data } = action.payload;
      return next(action);
    };
  };
