import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Email extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: props.email,
        }
    }

    render() {
        if (this.props.view === "short") {
            return (
                <div class="boxWrapped"
                onClick={()=>{this.props.clicker(this.state.email)}}
                >
                    {this.state.email.sender} : {this.state.email.subject}
                </div>
            )
        } else if (this.props.view === "long") {
            return (
                <div class="boxWrapped" >
                    <div class="boxHolder">
                        <div class="boxSend"> FROM: <br />{this.state.email.sender}</div>
                        <div class="boxRec"> TO: <br />{this.state.email.recipient}</div>
                    </div>
                    <div class="boxHolder">
                        <div class="boxSubject"> {this.state.email.subject}<div class="boxID" >
                        ID: {this.state.email.id}
                        </div></div>
                        <div class="boxDate"> {this.state.email.date}</div>
                    </div>
                    <div class="boxBody"> {this.state.email.message}
                    </div>
                </div>
            )
        } else { //no view case
            return (<div>{JSON.stringify(this.state.email)}</div>)
        }//need another case for creating emails : lots of text boxes
    }
}



Email.propTypes = {
    view: PropTypes.string,
    email: PropTypes.object,
    clicker: PropTypes.func,
}