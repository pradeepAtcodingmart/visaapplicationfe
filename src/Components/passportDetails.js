import React, { Component } from "react";
import {
  Form,
  Dropdown,
  Input
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import {Countries, SubmitButton, today} from './common'
import {API_URL} from './constants'
import axios from 'axios'
export default class PassportDetails extends Component {
  constructor(){
    super();
    this.state = {
      passportDetails :{
        applicantId:"1",
        passportNumber:"",
        placeOfIssue:"",
        dateOfIssue:"",
        dateOfExpiry:"",
        countryOfIssue:"",
        country:""
      },
      countries:[]
    }
  }
  componentDidMount(){
    Countries().then(data => {
     this.setState({countries: data})
;})
    }
  handleValue =(event,{value,name})=>{
    let {passportDetails} = this.state;
    passportDetails[name]=value;
    this.setState({passportDetails});
}
handleSubmit = () =>{
  axios.post(`${API_URL}/passport_detail`, {
    data:this.state.passportDetails,
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
})
  window.location.href ="/address_details"
}
  render() {
    let {passportNumber,placeOfIssue,dateOfIssue,dateOfExpiry,countryOfIssue,country} = this.state.passportDetails;
    let { countries } = this.state;
    return (
            <Form onSubmit={this.handleSubmit}>
              <Form.Field inline required>
                <label>Passport Number</label>
                <Input fluid placeholder="Passport number" name="passportNumber"  value={passportNumber} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Place of Issue</label>
                <Input fluid placeholder="Place of issue" name="placeOfIssue"  value={placeOfIssue} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline>
                <label>Date of issue</label>
                <DateInput
                  name="dateOfIssue"
                  required
                  readOnly
                  fluid 
                  placeholder="Date of issue"
                  maxDate={today}
                  // initialDate={dob}
                  value={dateOfIssue}
                  startMode={"year"}
                  dateFormat={"DD-MM-YYYY"}
                  iconPosition="left"
                  onChange={this.handleValue}
                />
                </Form.Field>
                <Form.Field inline>
                <label>Date of expiry</label>
                <DateInput
                  name="dateOfExpiry"
                  required
                  readOnly
                  fluid placeholder="Date of expiry"
                  // initialDate={dob}
                  maxDate={today}
                  value={dateOfExpiry}
                  startMode={"year"}
                  dateFormat={"DD-MM-YYYY"}
                  iconPosition="left"
                  onChange={this.handleValue}
                />
                </Form.Field>
                <Form.Field inline required>
                <label>Country of Issue</label>
                <Dropdown fluid placeholder="Select Country" name="countryOfIssue"  value={countryOfIssue} onChange={this.handleValue} search selection options={countries} />
              </Form.Field> 
              <Form.Field inline required>
                <label>Nationality mentioned there in</label>
                <Dropdown fluid placeholder="Select Country" name="country"  value={country} onChange={this.handleValue} search selection options={countries} />
              </Form.Field>
              {SubmitButton}
            </Form>
    );
  }
}
