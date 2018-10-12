import React from "react";
import { connect} from "react-redux";
import { push } from "react-router-redux";
import { addCity, setCurrentCity, wrongCityOn, wrongCityOff, saveDefaultCity } from "../modules/actions";

export class AddCityComponent extends React.Component {
    constructor( props ){
        super( props );
        this.state = { value: "" };
    }

    handleChange( event ){
        this.props.wrongCityOff();
        this.setState( { value: event.target.value } );
    }

    handleKeyDown( e ){
        if ( e.keyCode === 13 ){
            this.addCityReq();
        }
        return true;
    }

    addCityReq(){
        if ( /[a-zA-Zа-яА-Я\-]+$/.test( this.state.value ) ) {
            const APPID = "&APPID=17723f6591a237b59068917d98ec87a1";
            const address = `http://api.openweathermap.org/data/2.5/weather?q=${ this.state.value }&units=metric${ APPID }`;
            const cityName = this.state.value.charAt( 0 ).toUpperCase() + this.state.value.slice( 1 );
            const city = this.props.cities.find( x => x.name === cityName );
            const index = this.props.cities.indexOf( city );
            this.setState( { value: "" } );
            if ( index === -1 ) {
                if( this.props.needSaveDefaul ) {
                    this.props.saveDefaultCity( cityName );
                }
                this.props.addCity( address );
                this.props.changePage( "/" );
            } else {
                if( this.props.needSaveDefaul ) {
                    this.props.saveDefaultCity( cityName );
                }
                this.props.setCurrentCity( cityName );
                this.props.changePage( "/" );
            }
        } else{
            this.setState( { value: "" } );
            this.props.wrongCityOn();
            this.props.changePage( "/" );
        }
    }

    componentDidUpdate( prevProps ){
        if ( this.props.wrongCity && prevProps.wrongCity !== this.props.wrongCity ){
            this.setState( { value: "" } );
        }
    }

    render () {
        return (
                <React.Fragment>
                    <input
                        type="text"
                        className={`form-control city-input ${this.props.wrongCity ? "is-invalid" : ""}`}
                        placeholder={`${this.props.wrongCity ? "Такой город не найден" : "Например: Москва" }`}
                        onKeyDown={ this.handleKeyDown.bind( this ) }
                        value={ this.state.value }
                        onChange={ this.handleChange.bind( this ) }
                        onClick={this.props.wrongCityOff.bind( this )}
                    />
                    <button className="btn btn-primary ml-3 btn-add-city" onClick={ this.addCityReq.bind( this ) }>Добавить</button>
                </React.Fragment>

        )
    }
}

const mapStateToProps = ( state ) => {
    return{
        cities: state.cities,
        wrongCity: state.wrongCity
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return{
        addCity: ( url ) => dispatch( addCity( url ) ),
        changePage: ( path ) => dispatch( push( path ) ),
        setCurrentCity: ( index ) => dispatch( setCurrentCity( index ) ),
        wrongCityOn: () => dispatch( wrongCityOn() ),
        wrongCityOff: () => dispatch( wrongCityOff() ),
        saveDefaultCity: ( data ) => dispatch( saveDefaultCity( data ) )
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( AddCityComponent );