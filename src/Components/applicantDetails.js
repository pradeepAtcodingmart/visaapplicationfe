import React, { Component } from "react";
import {
  Form
} from "semantic-ui-react";
import {Countries, SubmitButton,formCreater} from './common'
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
        options:genderOptions,
        props: {
          fluid: true,
          search:true,
          selection:true
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
        type: "select",
        label: "Country Of Birth",
        name: "birthCountry",
        value: birthCountry,
        handleFunc: this.handleValue,
        placeholder: "Country Of Birth",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },
      {
        type: "select",
        label: "Religion",
        name: "religion",
        value: religion,
        handleFunc: this.handleValue,
        placeholder: "Religion",
        options:[],
        props: {
          fluid: true,
          search:true,
          selection:true
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
        options:[],
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      }
    ]
    let form = formCreater(array);
    if (this.state.apiFlag === true) {
      return <Redirect to='/passport_details' />
    }

    return (
            <Form
            onSubmit = {this.handleSubmit}
            >
              {form}
              {SubmitButton}
            </Form>
    );
  }
}
