import React from "react";
import { Route } from "react-router-dom";
import AddCityPage from "./pages/addCity";

import WeatherPage from "./pages/weather";


const App = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand"
                     href="/">
                    Погода
                </a>
            </nav>
            <main>
              <Route exact path="/" component={ WeatherPage }/>
              <Route exact path="/cities/add-city" component={ AddCityPage }/>
            </main>
        </div>
    )
};

export default App;
