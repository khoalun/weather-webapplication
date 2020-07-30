import { fork } from "redux-saga/effects";
import "isomorphic-fetch";

// import auth from "./auth";
import middleware from "./middleware";

export default function* rootSaga() {
  yield fork(middleware);

  // combine your saga here
  // yield fork(auth);
}
