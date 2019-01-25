import React, { Component } from "react";
import {
  Form,
  Input,
  Dropdown
} from "semantic-ui-react";
import {API_URL} from './constants'
import { Countries, SubmitButton, today, formCreater } from "./common";
import { DateInput } from "semantic-ui-calendar-react";
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class VisaDetails extends Component {
    constructor(){
        super();
        this.state ={
            visaDetails:{
            applicantId:"2",
            placeToBeVisited:"",
            visaDurationInMonth:"",
            noOfEntries:"",
            dateOfJourney:"",
            portOfArrivalIndia:"",
            portOfExitedIndia:"",
            lastVisitedCountry:"",
            },
            countries:[],
            apiFlag:false
        }
    }
    componentDidMount(){
      Countries().then(data => {
       this.setState({countries: data})
 ;})}
handleValue =(event,{name,value})=>{
        let {visaDetails} = this.state;
        visaDetails[name]=value;
        this.setState({visaDetails});
    }
handleSubmit = ()=>{
      axios.post(`${API_URL}/visa_detail`, {
        data:this.state.visaDetails,
    })
    .then( (response) => {
      this.setState({apiFlag:true})
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    }
  render() {
    if (this.state.apiFlag === true) {
      return <Redirect to='/photo_upload' />
    }
      let {
        placeToBeVisited,
        visaDurationInMonth,
        noOfEntries,
        dateOfJourney,
        portOfArrivalIndia,
        portOfExitedIndia,
        lastVisitedCountry, 
      } = this.state.visaDetails;
      let { countries } = this.state;
      let array =[
        {
          type: "input",
          label: "Place to be visited",
          name:"placeToBeVisited",
          value:placeToBeVisited,
          handleFunc: this.handleValue,
          placeholder:"place to be visited",
          props: {
            fluid: true
          }
        },
        {
          type: "input",
          label: "Visa duration in month",
          name:"visaDurationInMonth",
          value: visaDurationInMonth,
          handleFunc: this.handleValue,
          placeholder:"visa duration in month",
          props: {
            fluid: true
          }
        },
        {
          type: "input",
          label: "No of entries",
          name:"noOfEntries",
          value: noOfEntries,
          handleFunc: this.handleValue,
          placeholder:"no of entries",
          props: {
            fluid: true
          }
        },
        {
          type: "date",
          label: "Data of journey",
          name: "dateOfJourney",
          value: dateOfJourney,
          handleFunc: this.handleValue,
          placeholder: "data of journey",
          maxDate:today,
          minDate:new Date("01-01-1950"),
          iconPosition:"left",
          props: {
            fluid: true,
            required:true,
            readOnly:true
          }
        },
        {
          type: "input",
          label: "Port of arrival in india",
          name:"portOfArrivalIndia",
          value: portOfArrivalIndia,
          handleFunc: this.handleValue,
          placeholder:"port of arrival in india",
          props: {
            fluid: true
          }
        },
        {
          type: "input",
          label: "Port of exited in india",
          name:"portOfExitedIndia",
          value: portOfExitedIndia,
          handleFunc: this.handleValue,
          placeholder:"port of exited in india",
          props: {
            fluid: true
          }
        },
        {
          type: "select",
          label: "Countries of visited in decade",
          name:"lastVisitedCountry",
          value: lastVisitedCountry,
          handleFunc: this.handleValue,
          placeholder:"Countries of visited",
          options:countries,
          props: {
            fluid: true,
            search:true,
            selection:true
          }
        }
      ];
      let form = formCreater(array); 
    return (
        <Form onSubmit={this.handleSubmit}>
              {form}
            {SubmitButton}
        </Form>
    );
  }
}
