export function findedCity( state = null, action ){
    switch ( action.type ){
        case "FIND_CITY_SUCCESS":
            return action.loadedData;
        default:
            return state;
    }
}

export function weatherData( state = null, action ) {
    switch ( action.type ) {
        case "LOAD_DATA_SUCCESS":
            return action.loadedData;
        default:
            return state;
    }
}

export function currentCity( state = "", action ){
    switch ( action.type ){
        case "SET_CURRENT_CITY":
            return action.cityName;
        default:
            return state;
    }
}
export function wrongCity( state = false, action ) {
    switch ( action.type ){
        case "ADD_CITY_SUCCESS":
            state = false;
            return state;
        case "ADD_CITY_FAIL": {
            state = true;
            return state;
        }
        default:
            return state;
    }
}

export function cities( state = readToLocalStorage( "cities" ) || [], action ){
    switch ( action.type ) {
        case "ADD_CITY": {
            const newCity = {
                "id": action.loadedData.id,
                "name": action.loadedData.name,
                "country": action.loadedData.sys.country,
                "coord": action.loadedData.coord
            };
            if ( !state.find( cur => cur.id === newCity.id || cur.name === newCity.name ) ) {
                state.push( newCity );
                saveToLocalStorage( "cities", state );
            }
            return state;
        }
        case "DELETE_CITY": {
            const client = state.find( x => x.id === action.cityId );
            const index = state.indexOf( client );
            if ( index === -1 ) {
                return state;
            }
            state.splice( index, 1 );
            saveToLocalStorage( "cities", state );
            return [...state];
        }
        default:
            return state;
    }
}

export function defaultCity( state = readToLocalStorage( "defaultCity" ) || null, action ){
    switch ( action.type ){
        case "SAVE_TO_STORAGE":{
            const defaultCity = {
                "name": action.loadedData
            };
            state = defaultCity;
            saveToLocalStorage( "defaultCity", state );
            return state;
        }
        default:
            return state;
    }
}

function saveToLocalStorage( key, data ) {
    localStorage.setItem( key, JSON.stringify( data ) );
}

function readToLocalStorage( key ) {
    return JSON.parse( localStorage.getItem( key ) );
}
