import React from "react";
import { push } from "react-router-redux";
import { connect} from "react-redux";
import AddCityComponent from "../components/addCity";
import DisplayCitiesComponent from "../components/displayCities";

export class AddCityPage extends React.Component {
    render () {
        return (
            <React.Fragment>
                <div className="text-center">
                    <br/><br/><br/>
                    <h3>Введите название города</h3>
                    <div className="input-group justify-content-center">
                        <AddCityComponent needSaveDefaul={true}/>
                    </div>
                    <div className="mt-2">
                        <DisplayCitiesComponent
                            needSaveDefaul={true}
                            checkState={ () => { this.props.changePage( "/" ) } }
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        changePage: ( path ) => dispatch( push( path ) ),
    }
};

export default connect( null, mapDispatchToProps )( AddCityPage );