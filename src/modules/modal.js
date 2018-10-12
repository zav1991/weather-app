const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

const initialState = { modals: [] };

export default ( state = initialState, action ) => {
    switch ( action.type ) {
        case OPEN_MODAL:
            return {
                ...state,
                modals: state.modals.concat( action.obj )
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modals: state.modals.filter( item => item.id !== action.obj.id )
            };
        default:
            return state;
    }
};

export const openModal = ( obj ) => {
    return {
        type: OPEN_MODAL,
        obj
    };
};

export const closeModal = ( obj ) => {
    return {
        type: CLOSE_MODAL,
        obj
    };
};