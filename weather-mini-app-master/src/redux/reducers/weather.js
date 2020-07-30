import { REQUEST_ERROR } from "src/redux/actions/type";

export const initialState = {
  list: {
    city: {},
    data: [],
    loading: true
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_WEATHER_LIST_REQUEST":
      return { ...state, list: { ...initialState.list } };

    case "GET_WEATHER_LIST_SUCCESS": {
      return {
        ...state,
        list: {
          data: [...action.payload.list],
          city: { ...action.payload.city },
          loading: false
        }
      };
    }
    default:
      return state;
  }
}
