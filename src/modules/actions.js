export function findCitySuccess( loadedData ){
    return{
        type: "FIND_CITY_SUCCESS",
        loadedData
    }
}

export function findCity( url ) {
    return ( dispatch ) => {
        fetch( url )
            .then( res => res.json() )
            .then( json => {
                dispatch( findCitySuccess( json ) );
                dispatch( setCurrentCity( json.city ) );
            })
            .catch( ( err ) => console.log( err ) );
    };
}

export function loadDataSuccess( loadedData ) {
    return {
        type: "LOAD_DATA_SUCCESS",
        loadedData
    };
}

export function loadData( url ) {
    return ( dispatch ) => {
        fetch( url )
            .then( res => res.json() )
            .then( json => {
                dispatch( loadDataSuccess( json ) );
                dispatch( setCurrentCity( json.name ) );
            })
            .catch( ( err ) => console.log( err ) );
    };
}

export function setCurrentCity( cityName ){
    return{
        type: "SET_CURRENT_CITY",
        cityName
    };
}

export function deleteCity( cityId ){
    return{
        type: "DELETE_CITY",
        cityId
    }
}

export function addCitySuccess( loadedData ){
    return{
        type: "ADD_CITY",
        loadedData
    }
}

export function wrongCityOn(){
    return{
        type: "ADD_CITY_FAIL"
    }
}

export function wrongCityOff(){
    return {
        type: "ADD_CITY_SUCCESS"
    }
}

export function addCity( url ) {
    return ( dispatch ) => {
        fetch( url )
            .then( res => res.json() )
            .then( json => {
                dispatch( addCitySuccess( json ) );
                dispatch( loadDataSuccess( json ) );
                dispatch( setCurrentCity( json.name ) );
                dispatch( wrongCityOff() );
            })
            .catch( ( err ) => {
                console.log( err );
                dispatch( wrongCityOn() );
            } );
    };
}

export function saveDefaultCityToStorage( loadedData ){
    return{
        type: "SAVE_TO_STORAGE",
        loadedData
    }
}

export function saveDefaultCity( loadedData ){
    return ( dispatch ) => {
        if( loadedData.id ) {
            dispatch( addCitySuccess( loadedData ) );
            dispatch( saveDefaultCityToStorage( loadedData.name ) );
        } else if ( loadedData ) {
            dispatch( saveDefaultCityToStorage( loadedData ) );
        }
    }
}