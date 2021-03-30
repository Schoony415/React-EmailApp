import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Email from "./Email"
//I had to do npm install to get dropdowns
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

//for the radio buttons:
//https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs

function sortWord(a,b){ //doesn't consider case
if (a < b) {
  return -1;
}
if (a > b) {
  return 1;
}
// names must be equal
return 0;
}

export default class MainDisp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailList: [],
            address: props.address,
            selectedEmail: {},
            //these will be created durring run time, idk if I need to say them
            //the answer is no but it throws a hissy warning
            SearchText: "",
            SearchType: "",
            SortType: "ID",
        }
        //shamelessly stolen but it works:
        this.onChangeValue = this.onChangeValue.bind(this)
    }

    onChangeValue(event) { //this is a rather cheeky function
        // console.log(event.target.value);
        console.log(event.target);
        // console.log(event);
        this.setState( { [event.target.name]: event.target.value }, 
        ()=>{ //setState takes a callback function so this works
            //we are checking for if we need to change sort
            if(event.target.name=="SortType") this.SortEmail()
        } )
    }

    searchEmail(){
        console.log("Search by", this.state.SearchText, this.state.SearchType)
    }


    SortEmail(){
        console.log("Sort by", this.state.SortType)
        var temp = this.state.emailList
        switch(this.state.SortType){
            case "ID": temp.sort(function (a,b){return a.id - b.id}); break;
            case "Sender": temp.sort(function(a,b){ console.log("a");return sortWord(a.sender, b.sender)}); break;
            case "Subject": temp.sort(function(a,b){ console.log("a");return sortWord(a.subject, b.subject)}); break;
            case "Date": temp.sort(function(a,b){ console.log("a");return sortWord(a.date, b.date)}); break;
        }
        console.log(temp)
        this.setState( { emailList: temp } )/*,()=>{
        console.log("sortcompelte"); this.render()}) */
    }


    makeRequest() {
        console.log("making request")
        fetch(this.state.address + "emails", { method: 'GET' })
            .then(response => {
                console.log(response); /*this is just my returned packet at this point*/
                return response /* returning response because I'm still dealing with the packet in the next block */
            })
            .then(response => {
                if (response.ok) console.log("Loaded Emails");
                else throw new Error("Request was bad: " + response.status);
                return response.json() /*turning to json spits out the body from the packet*/
            })
            .then(data => {
                console.log(data)/*this is now the body obj*/
                this.setState({ emailList: data })
            })
            .then(()=>{
                this.SortEmail()
            })
            .catch(e => console.error(e))
            //check if there is a sort by and sort emails
    }

    clickEmail(email) {
        //console.log("email!!!", email)
        this.setState({ selectedEmail: email })
        //.then(console.log(this.state.selectedEmail))
    }

    sortfunc() {
        console.log("SORT", this.state.SortType)
    }


    //map: <li key={"e"+i}> {JSON.stringify(email)} </li>
    render() {console.log("r",this.state.SortType)
        return (<div key="mainReturn" class="app">
            <div key="Header" class="Header">
                <h2>Generic Friendly Greeting</h2>
                <text>Email Server: {this.state.address}</text>
            </div>
            <div class="boxHolder">
            <fieldset key="Primary Buttons">
                <button key="getButton" onClick={this.makeRequest.bind(this)}
                > Get Emails </button>
                <button key="back"
                    disabled={this.state.selectedEmail.id ? false : true}
                    onClick={() => { this.setState({ selectedEmail: {} }) }}
                > Back </button>
                <button key="create"
                    disabled={this.state.selectedEmail.id ? true : false}
                    onClick={() => { console.log("Create Email") }}
                > Create </button>
                <button key="delete"
                    disabled={this.state.selectedEmail.id ? false : true}
                    onClick={() => { console.log("Delete Email", this.state.selectedEmail) }}
                > Delete </button>
                <button key="hide"
                    disabled={this.state.emailList.length != 0 ? false : true}
                    onClick={() => { this.setState({ selectedEmail: {}, emailList: [] }) }}
                > GoodBye </button>
            </fieldset>
            <fieldset key="Search Set"
                disabled={this.state.emailList.length != 0 ? false : true}
                /* Button Click doesn't count as a change, so this is safe and gets rid of the below division */
                onChange={this.onChangeValue}>
                <button key="search"
                    onClick={() => { this.searchEmail() }}
                > Search </button>
                <input key="searchText"
                    name="SearchText"
                    type="text"
                    placeholder="search subject"
                    /* onChange={this.onChangeValue} *//*the web throws a warning without this here but ignore it as i'm onchanging the whole field set*/
                    value={this.state.SearchText}
                />
                {/* I do not like that these are on a new line */}
                {/* Dont forget there is a search endpoint, learn it */}
                {/* this div is redundant if on change is above in field set*/}
                {/* <div key="Search Buttons" onChange={this.onChangeValue} > */}
                <input type="radio" value="Email" name="SearchType" /> <label> Email </label>
                <input type="radio" value="Subject" name="SearchType" /> <label> Subject </label>
                {/* </div>*/}
            </fieldset>
            <fieldset key="Sort Area" onChange={this.onChangeValue}
                disabled={this.state.emailList.length != 0 ? false : true}>
                <label>Sort by: </label>
                <input type="radio" value="ID" name="SortType" /><label> ID </label>
                <input type="radio" value="Sender" name="SortType" /> <label> Sender </label>
                <input type="radio" value="Subject" name="SortType" /> <label> Subject </label>
                <input type="radio" value="Date" name="SortType" /> <label> Date </label>
            </fieldset>
            </div>
            
            <hr />
            {/*I need another if statement for the view to call <email/> with "edit" mode based on button click*/}
            {this.state.selectedEmail.id ?
            
                <Email key="singleEmail"
                    view="long"
                    email={this.state.selectedEmail}
                />
                :
                this.state.emailList.map((email, i) => /*I think I have to sort before the map*/
                    <Email key={"e" + email.id}
                        clicker={this.clickEmail.bind(this)}
                        view="short"
                        email={email}
                    />
                )
            }
        </div>)
    }
}

MainDisp.propTypes = {
    Truth: PropTypes.bool,
    address: PropTypes.string,

}
