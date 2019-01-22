import React, { Component } from "react";
import {
  Form,
  Dropdown,
  Input
} from "semantic-ui-react";
import {Countries, SubmitButton} from './common'
import { Redirect } from 'react-router-dom'
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
      apiFlag:false
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
.then((response) =>{
  this.setState({apiFlag:true});
  console.log(response);
})
.catch((error) =>{
  console.log(error);
})
// history.push("/passport_details")
  //  window.location.href ="/passport_details"
  }
  render() {
    let array = [
      {
        type: "input",
        label: "Name",
        name: "name",
        value: name,
        handleFunc: this.handleValue,
        placeholder: "Name",
        props: {
          fluid: true
        }
      },
      {
        type: "select",
        label: "Select Gender",
        name: "gender",
        value: gender,
        handleFunc: this.handleValue,
        placeholder: "Select  Gender",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "City Of Birth",
        name: "birthCity",
        value: birthCity,
        handleFunc: this.handleValue,
        placeholder: "City Of Birth",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Country Of Birth",
        name: "birthCountry",
        value: birthCountry,
        handleFunc: this.handleValue,
        placeholder: "Country Of Birth",
        props: {
          fluid: true
        }
      },
      {
        type: "select",
        label: "Religion",
        name: "religion",
        value: religion,
        handleFunc: this.handleValue,
        placeholder: "Religion",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Visible identification marks",
        name: "identificationMark",
        value: identificationMark,
        handleFunc: this.handleValue,
        placeholder: "Visible identification marks",
        props: {
          fluid: true
        }
      },
      {
        type: "select",
        label: "Education Qualification",
        name: "education",
        value: education,
        handleFunc: this.handleValue,
        placeholder: "Education Qualification",
        props: {
          fluid: true
        }
      }
    ]
    if (this.state.apiFlag === true) {
      return <Redirect to='/passport_details' />
    }
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
