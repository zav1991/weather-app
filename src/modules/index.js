import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { weatherData, cities, currentCity, findedCity, wrongCity, defaultCity } from "./reducers";
import modals from "./modal";

export default combineReducers( {
    routing: routerReducer,
    weatherData,
    cities,
    currentCity,
    findedCity,
    wrongCity,
    defaultCity,
    modals
} );