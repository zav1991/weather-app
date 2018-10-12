import React from "react";
import { connect } from "react-redux";
import { setCurrentCity, deleteCity, saveDefaultCity } from "../modules/actions";
import "./components.css";

export class DisplayCitiesComponent extends React.Component{
    render() {
        return (
            <div className="list-group flex-row flex-wrap">
                {
                    this.props.cities.map( ( item, index ) => (
                        <React.Fragment key={`fragment-${index}`}>
                            <div className="col-md-4 row">
                                <button
                                    className={`list-group-item list-group-item-action col-10 ${
                                        this.props.currentCity === item.name ? "active" : ""}`}
                                    onClick={() =>{
                                        this.props.checkState();
                                        this.props.setCurrentCity( item.name )
                                        if( this.props.needSaveDefaul ){
                                            this.props.saveDefaultCity( item.name );
                                        }
                                    }
                                    }
                                >
                                    {item.name}
                                </button>
                                <div className="button-delete-wrapper">
                                    <button
                                        className={`btn col-2 delete-btn ${
                                            this.props.currentCity === item.name ? "btn-primary" :
                                                "btn-light"}`}
                                        onClick={ () => {
                                            this.props.deleteCity( item.id )
                                        } }
                                    >
                                        <div className="delete-btn-img"/>
                                    </button>
                                </div>
                            </div>
                        </React.Fragment>
                    ) )
                }
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        cities: state.cities,
        currentCity: state.currentCity
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setCurrentCity: ( index ) => dispatch( setCurrentCity( index ) ),
        deleteCity: ( id ) => dispatch( deleteCity( id ) ),
        saveDefaultCity: ( data ) => dispatch( saveDefaultCity( data ) )
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( DisplayCitiesComponent );