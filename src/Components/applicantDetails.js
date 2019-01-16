import React, { Component } from "react";
import {
  Form,
  Dropdown,
  Input
} from "semantic-ui-react";
import {Countries, SubmitButton} from './common'
import {API_URL} from './constants'
import axios from 'axios'
export default class ApplicantDetails extends Component {
  constructor(){
    super();
    this.state ={
      applicantDetails:{
        applicantId:"1",
        name:"",
        gender:"",
        birthCity:"",
        birthCountry:"",
        religion:"",
        identificationMark:"",
        education:""
      },
      genderOptions:[
        {
          key:"male",
          value:"male",
          text:"male"
        },
        {
          key:"female",
          value:"female",
          text:"female"
        }
      ],
      countries:[],
    }
  }
  componentDidMount(){
    Countries().then(data => {
     this.setState({countries: data})
;})
    }
  handleValue =(event,{value,name})=> {
    let {applicantDetails} = this.state;    
    applicantDetails[name]=value;
    this.setState({applicantDetails});
  }
  handleSubmit = ()=>{
  axios.post(`${API_URL}/applicant_detail`, {
    data:this.state.applicantDetails,
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
})
   window.location.href ="/passport_details"
  }
  render() {
    let {
      name,
      gender,
      birthCity,
      birthCountry,
      religion,
      identificationMark,
      education
    } = this.state.applicantDetails;
    let {genderOptions , countries} = this.state;
    return (
            <Form
            onSubmit = {this.handleSubmit}
            >
              <Form.Field inline required>
                <label>Given name (Complete as in Passport)</label>
                <Input fluid placeholder="Name" name="name" value={name} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>gender</label>
                <Dropdown fluid placeholder="Select gender" name="gender" value={gender} selection options={genderOptions} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Town/City of birth</label>
                <Input fluid placeholder="city of birth" name="birthCity" value={birthCity} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Country of birth</label>
                <Dropdown fluid placeholder="Select Country" name={birthCountry} search selection options={countries} onChange={this.handleValue} />
              </Form.Field>
              <Form.Field inline required>
                <label>Select Religion</label>
                <Dropdown fluid placeholder="Select Religion" name={religion} search selection options={[]} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Visible identification marks</label>
                <Input fluid placeholder="First name" name="identificationMark"  value={identificationMark} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Education Qualification</label>
                <Dropdown fluid placeholder="Select Education" value={education} search selection options={[]} onChange={this.handleValue}/>
              </Form.Field>
              {SubmitButton}
            </Form>
    );
  }
}
