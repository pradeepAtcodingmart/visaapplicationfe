import React, { Component } from "react";
import {
  Form,
  Dropdown,
  Input
} from "semantic-ui-react";
import axios from 'axios'
import {API_URL} from './constants'
import { DateInput } from "semantic-ui-calendar-react";
import { SubmitButton, today, Countries, visaTypes,purposes} from './common'

export default class VisaApplication extends Component {
  constructor() {
    super();
    this.state = {
      basicDetails : {
        applicant_id:1,
        visaApplyingFrom:"",
        indianMission:"",
        nationality:"",
        dob:"",
        email:"",
        reEnteredEmail:"",
        dateOfArrival:"",
        visaType:"",
        purpose:""
      },
      countries:[],
      visaTypes:visaTypes,
      purposes:purposes,
    };
  }

  componentDidMount(){
     Countries().then(data => {
      this.setState({countries: data})
;})

  }
  handleValue =(event,{ value ,name})=>{
    let {basicDetails} = this.state;    
    basicDetails[name]=value;
    this.setState({basicDetails});
}
handleSubmit =()=>{
  axios.post(`${API_URL}/profile_detail`, {
    data:this.state.basicDetails,
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
})
window.location.href="/applicant_details";
}

  render() {
    let {
      visaApplyingFrom,
      indianMission,
      nationality,
      dob,
      email,
      reEnteredEmail,
      dateOfArrival,
      visaType,
      purpose
    } = this.state.basicDetails;
    let {countries,visaTypes , purposes} = this.state;
    return (
            <Form
            onSubmit={this.handleSubmit}
            >
              <Form.Field inline required>
                <label>Country you are applying visa from</label>
                <Dropdown required fluid placeholder="Select Country" name="visaApplyingFrom" value={visaApplyingFrom} onChange={this.handleValue} search selection scrolling options={countries} />
              </Form.Field>
              <Form.Field inline required>
                <label>Indian Mission</label>
                <Dropdown fluid placeholder="Select Mission" name="indianMission" value={indianMission} onChange={this.handleValue} search selection options={[]} />
              </Form.Field>
              <Form.Field inline required>
                <label>Nationality</label>
                <Dropdown fluid placeholder="Select Nationality" name="nationality" value={nationality} onChange={this.handleValue} search selection options={countries} />
              </Form.Field>
              <Form.Field inline>
                <label>Data of birth</label>
                <DateInput
                  name="dob"
                  value={dob} 
                  maxDate={today}
                  onChange={this.handleValue}
                  required
                  readOnly
                  fluid placeholder="Date of birth"
                  // initialDate={dob}
                  startMode={"year"}
                  dateFormat={"DD-MM-YYYY"}
                  iconPosition="left"
                />
              </Form.Field>
              <Form.Field inline>
                <label>Email ID</label>
                <Input fluid placeholder="email id" name="email" value={email} onChange={this.handleValue} />
              </Form.Field>
              <Form.Field inline>
                <label>Re Enter Email ID</label>
                <Input fluid placeholder="email id" name="reEnteredEmail" value={reEnteredEmail} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline>
                <label>Data of arrival</label>
                <DateInput
                  name="dateOfArrival" 
                  value={dateOfArrival} 
                  onChange={this.handleValue}
                  maxDate={today}
                  required
                  readOnly
                  fluid placeholder="Date of birth"
                  // initialDate={dob}
                  startMode={"year"}
                  dateFormat={"DD-MM-YYYY"}
                  iconPosition="left"
                />
              </Form.Field>
              <Form.Field inline required>
                <label>Visa Type</label>
                <Dropdown fluid placeholder="Select visa type" name="visaType" value={visaType} onChange={this.handleValue} search selection options={visaTypes} />
              </Form.Field>
              <Form.Field inline required>
                <label>Purpose</label>
                <Dropdown fluid placeholder="purpose of visit" name="purpose" value={purpose} onChange={this.handleValue} search selection options={purposes} />
              </Form.Field>
              {SubmitButton}
            </Form>
    );
  }
}

