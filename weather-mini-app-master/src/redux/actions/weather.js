import { SINGLE_API } from "src/redux/actions/type";

export const getWeatherRequest = (payload, next, nextError) => {
  return {
    type: SINGLE_API,
    payload: {
      uri: "/forecast",
      params: payload,
      // opt: { method: "GET" },
      beforeCallType: "GET_WEATHER_LIST_REQUEST",
      successType: "GET_WEATHER_LIST_SUCCESS",
      afterSuccess: next,
      afterError: nextError
    }
  };
};
