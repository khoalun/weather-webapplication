import { REQUEST_ERROR } from "src/redux/actions/type";

export const initialState = false;

export default function(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return !state;

    case "START_LOADING":
      return true;

    case "STOP_LOADING":
      return false;

    case REQUEST_ERROR: {
      if (process.browser) {
        const audio = document.getElementById("noti-sound");
        audio.play();
        notification.error({
          message: "Error Message",
          description: action.payload.message || action.payload
        });
      }
      return false;
    }
    default:
      return state;
  }
}
