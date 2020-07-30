import merge from "lodash/merge";
import { put, call } from "redux-saga/effects";

// import Router from "next/router";

import URL from "src/constants/url";
import ENV from "src/constants/env";

import AuthStorage from "src/utils/AuthStorage";
import { REQUEST_ERROR } from "src/redux/actions/type";

// const { API_URL } = URL;

const API_URL = "http://api.openweathermap.org/data/2.5";

const fetching = (url, options) =>
  fetch(API_URL + url, options)
    .then(response => {
      return response.status === 204 || response.statusText === "No Content"
        ? {}
        : response.json();
    })
    .then(json => {
      if (json.error) {
        throw json.error;
      } else {
        return json;
      }
    })
    .catch(err => {
      throw err;
    });

/* The example data is structured as follows:

Params: {
	uri: ,
	params: ,
	opt: ,
	loading: ,
	uploadImg: ,
}
*/

export default function*({
  uri,
  params = {},
  opt = {},
  loading = true,
  uploadImg = false
}) {
  const defaultOptions = {
    method: "GET",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json"
    }
  };

  if (!uri) {
    return;
  }

  const options = merge(defaultOptions, opt);

  if (uploadImg && params.files) {
    options.headers = {};
  }

  // set token
  if (AuthStorage.loggedIn) {
    options.headers.Authorization = AuthStorage.token;
  }

  let url = uri;

  if (params && Object.keys(params).length > 0) {
    if (options && options.method === "GET") {
      url +=
        "?" +
        Object.keys(params)
          .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
          .join("&");
    } else if (uploadImg && params.files) {
      const formData = new FormData();
      params.files.forEach(img => {
        formData.append("files", img, img.name);
      });

      options.body = formData;
    } else {
      options.body = JSON.stringify(params);
    }
  }

  if (loading) {
    yield put({ type: "START_LOADING" });
  }

  let response;
  try {
    if (ENV !== "production") {
      console.info("====> Call /api/v1/" + url, ", options=", options);
    }

    response = yield call(fetching, url, options);

    if (loading) {
      yield put({ type: "STOP_LOADING" });
    }

    return response;
  } catch (error) {
    response = { error };

    if (error.message !== "Unexpected end of JSON input") {
      if (error.statusCode === 401 && error.code !== "ACCOUNT_DISABLED") {
        // Access token has expired
        if (error.code === "INVALID_TOKEN") {
          if (AuthStorage.loggedIn) {
            yield put({ type: "LOGOUT_REQUEST" });
          }

          yield put({
            type: REQUEST_ERROR,
            payload: "Access token has expired"
          });
          Router.push("/login");
        }
        if (error.code === "AUTHORIZATION_REQUIRED") {
          yield put({
            type: REQUEST_ERROR,
            payload: "You don't have permission for this action!"
          });
        }
      } else if (
        error.statusCode === 401 &&
        error.code === "ACCOUNT_DISABLED"
      ) {
        // Access token has expired
        if (AuthStorage.loggedIn) {
          yield put({ type: "LOGOUT_REQUEST" });
        }

        yield put({
          type: REQUEST_ERROR,
          payload: "Account has been disabled"
        });
        Router.push("/login");
      } else {
        yield put({ type: REQUEST_ERROR, payload: error.message || error });
      }

      return response;
    }
    if (loading) {
      yield put({ type: "STOP_LOADING" });
    }

    return {};
  }
}
