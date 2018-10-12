import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import DisplayCitiesComponent from "./displayCities";
import { loadData, findCity, saveDefaultCity } from "../modules/actions";
import { openModal } from "../modules/modal";
import ModalsComponent from "./modal";
import AddCityComponent from "../components/addCity";

export class DisplayWeatherComponent extends React.Component {
    constructor( props ){
        super( props );
        this.state ={ isFinded: false };
    }

    loadWeather( key ) {
        const APPID = "&APPID=17723f6591a237b59068917d98ec87a1";
        const address =
            `http://api.openweathermap.org/data/2.5/weather?${key}&units=metric${APPID}`;
        this.props.loadData( address );
    }

    openModal( cityName ) {
        this.props.openModal( {
            id: "confirm-city-modal",
            text: `Вы находитесь в городе ${cityName}?`,
            onConfirm: () => {
                this.props.saveDefaultCity( this.props.weather );
                this.setState( { isFinded: false } )},
            onClose: () => this.props.changePage( "/cities/add-city" )
        } );
    }

    findCityByIp(){
        const token = "568634293e43b6";
        const address = `http://ipinfo.io/json?token=${token}`;
        this.props.findCity( address );
    }

    findCity(){
        const self = this;
        if( "geolocation" in navigator ){
            navigator.geolocation.getCurrentPosition(
                function success( position ) {
                    self.loadWeather(
                        `lat=${ position.coords.latitude.toFixed( 4 ) }&lon=${ 
                            position.coords.longitude.toFixed( 4 )  }` );
                    self.setState( { isFinded: true } );
                },
                function error() {
                    self.findCityByIp();
                } )
        }
    }

    convertPressure( pressure ){
        const mult = 0.75006375541921;
        return Math.ceil( pressure * mult )
    }

    componentDidMount(){
        if ( !this.props.defaultCity && !this.props.findedCity && !this.props.weather ){
            this.findCity();
        } else if ( !this.props.weather && this.props.defaultCity ){
            this.loadWeather( "q=" +  this.props.defaultCity.name );
        } else if ( this.props.weather && this.props.weather.name !== this.props.currentCity ){
            this.loadWeather( "q=" +  this.props.currentCity );
        }
    }

    componentDidUpdate( prevProps ){
        if ( prevProps.currentCity !== this.props.currentCity &&
            !this.state.isFinded &&
            this.props.currentCity !== this.props.weather.name ){
            const city = this.props.cities.find( x => x.name === this.props.currentCity );
            const index = this.props.cities.indexOf( city );
            if ( index !== -1 ) {
                this.loadWeather( "q=" +  this.props.cities[ index ].name );
            }
        }
        if ( !this.state.isFinded &&
            prevProps.findedCity === null &&
            this.props.findedCity !== null ){
            this.setState( { isFinded: true } );
            let coord = this.props.findedCity.loc.split( "," );
            this.loadWeather( `lat=${ coord[ 0 ] }&lon=${ coord[ 1 ] }` );
        }
        if ( this.state.isFinded && this.props.findedCity && this.props.currentCity === this.props.findedCity.city ){
            this.openModal( this.props.findedCity.city );
        } else if ( this.state.isFinded && this.props.weather && this.props.currentCity === this.props.weather.name ){
            this.openModal( this.props.weather.name )
        }
    }

    render () {
        const { weather } = this.props;
        let iconUrl;
        if ( weather ){
             iconUrl = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
        }
        if ( !weather ){
            return (
                <div>
                    <div className="row">
                        <div className="col-3">
                            <div className="weather">
                                <div className="row justify-content-center city-name">
                                    <h2>{this.props.currentCity}</h2>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="align-self-center temperature"></div>
                                </div>
                                <div className="params">
                                    <div className="wind">
                                        <span className="unit"> </span>
                                    </div>
                                    <div className="pressure">
                                        <span className="unit"> </span>
                                    </div>
                                    <div className="humidity">
                                        <span className="unit"> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="row find-city-row">
                                <div className="ml-3 mr-3 mt-2">Другие города:</div>
                                <AddCityComponent />
                            </div>
                            <DisplayCitiesComponent
                                needSaveDefaul={false}
                                checkState={ () => { this.setState( { isFinded:false } ) } }
                            />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="">
                <div className="row">
                    <div className="col-3">
                        <div className="weather">
                            <div className="row justify-content-center city-name">
                                <div className="current-city-name">{this.props.currentCity}</div>
                            </div>
                            <div className="row justify-content-center">
                                <img src={iconUrl}/>
                                <div className="align-self-center temperature">{weather.main.temp}&#8451;</div>
                            </div>
                        <div className="params">
                            <div className="wind">
                                Скорость ветра: {weather.wind.speed}
                                <span className="unit"> м/с</span>
                            </div>
                            <div className="pressure">
                                Давление: {this.convertPressure( weather.main.pressure ) }
                                <span className="unit"> мм рт.с.</span>
                            </div>
                            <div className="humidity">
                                Влажность: {weather.main.humidity}
                                <span className="unit">%</span>
                            </div>
                                <button
                                    className="btn btn-link default-btn"
                                    onClick={this.props.saveDefaultCity.bind( this, this.props.currentCity )}
                                >
                                    <div className="default-btn-text">
                                        Выбрать городом по умолчанию
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row find-city-row">
                            <div className="ml-3 mr-3 mt-2">Другие города:</div>
                            <AddCityComponent needSaveDefaul={false}/>
                        </div>
                        <DisplayCitiesComponent
                            needSaveDefaul={false}
                            checkState={ () => { this.setState( { isFinded:false } ) } }
                        />
                    </div>
                </div>
                <ModalsComponent/>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        weather: state.weatherData,
        cities: state.cities,
        currentCity: state.currentCity,
        findedCity: state.findedCity,
        defaultCity: state.defaultCity
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return{
        loadData: ( url ) => dispatch( loadData( url ) ),
        findCity: ( url ) => dispatch( findCity( url ) ),
        changePage: ( path ) => dispatch( push( path ) ),
        openModal: ( obj ) => dispatch( openModal( obj ) ),
        saveDefaultCity: ( data ) => dispatch( saveDefaultCity( data ) )
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( DisplayWeatherComponent );