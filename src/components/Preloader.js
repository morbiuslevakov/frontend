import React from "react";
import { Card } from 'react-bootstrap';
import { connect } from "react-redux";
import { BsCopy } from "react-icons/bs";


class Preloader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <Card.Text><BsCopy className="copy-icon"/></Card.Text>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Preloader);