import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeModal } from "../modules/modal";
import "./modal.css";

class MyPortal extends React.PureComponent {
    constructor( props ) {
        super( props );
        this.el = document.createElement( "div" );
    }

    componentDidMount() {
        document.body.appendChild( this.el );
    }

    componentWillUnmount() {
        document.body.removeChild( this.el );
    }

    render() {
        return ReactDOM.createPortal( this.props.children, this.el );
    }
}

class Modal extends React.Component {
    onClose() {
        if ( this.props.item.onClose ) {
            this.props.item.onClose();
            this.props.onClose( this.props.item );
        } else {
            this.props.onClose( this.props.item );
        }
    }

    onConfirm() {
        if ( this.props.item.onConfirm ) {
            this.props.item.onConfirm();
            this.props.onClose( this.props.item );
        }
    }

    render() {
        let { zIndex } = this.props;
        if ( !zIndex ) {
            zIndex = 0;
        }
        const styleZIndex = 10;
            const { text } = this.props.item;

        return (
            <div className="modal-wrapper" style={ { zIndex: ( zIndex + 1 ) * styleZIndex } }>
                <div className="modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="mx-auto"> </p>
                            </div>
                            <div className="modal-body">
                                <p className="mx-auto">{text}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btc-primary"
                                    onClick={ () => this.onConfirm() }>
                                    Да
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={ () => this.onClose() }>
                                    Изменить город
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ModalsComponent extends React.Component {
    render() {
        const modals = this.props.modals.modals.map( ( item, i ) =>
            <MyPortal key={ i }>
                <Modal item={ item }
                       onClose={ ( item ) => this.props.dispatch( closeModal( item ) ) }
                />
            </MyPortal> );
        return (
            <div className="modals">
                { modals }
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return { modals: state.modals || [] };
}

const mapDispatchToProps = dispatch => bindActionCreators( { dispatch }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( ModalsComponent );
