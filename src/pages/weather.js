import React from "react";
import DisplayWeather from "../components/displayWeather";

export default class WeatherPage extends React.Component {
    render () {
        return (
            <DisplayWeather {...this.props}/>
        )
    }
}