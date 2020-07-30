import loading, { initialState as initialLoading } from "./loading";
import weather, { initialState as initialWeather } from "./weather";

export const initialState = {
  loading: initialLoading,
  weather: initialWeather
};

export default {
  loading,
  weather
};
