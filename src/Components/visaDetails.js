import React, { Component } from "react";
import {
  Form,
  Input,
  Dropdown
} from "semantic-ui-react";
import {API_URL} from './constants'
import { Countries, SubmitButton, today } from "./common";
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
    return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Field inline required>
                <label>Place to be visited</label>
                <Input fluid placeholder="place to be visited" name="placeToBeVisited" value={placeToBeVisited} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Visa duration in month</label>
                <Input fluid placeholder="visa duration in month" name="visaDurationInMonth" value={visaDurationInMonth} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>No of entries</label>
                <Input fluid placeholder="no of entries" name="noOfEntries" value={noOfEntries} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Data of journey</label>
                <DateInput
                  name="dateOfJourney"
                  required
                  readOnly
                  maxDate={today}
                  fluid placeholder="data of journey"
                  // initialDate={dob}
                  value={dateOfJourney}
                  startMode={"year"}
                  dateFormat={"DD-MM-YYYY"}
                  iconPosition="left"
                  onChange={this.handleValue}
                />
                </Form.Field>
              <Form.Field inline required>
                <label>Port of arrival in india</label>
                <Input fluid placeholder="port of arrival in india" name="portOfArrivalIndia" value={portOfArrivalIndia} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Port of exited in india</label>
                <Input fluid placeholder="port of exited in india" name="portOfExitedIndia" value={portOfExitedIndia} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Countries of visited in decade</label>
                <Dropdown  fluid placeholder="Countries of visited"   search selection name="lastVisitedCountry" value={lastVisitedCountry} options={countries} onChange={this.handleValue}/>
              </Form.Field> 
            {SubmitButton}
        </Form>
    );
  }
}
