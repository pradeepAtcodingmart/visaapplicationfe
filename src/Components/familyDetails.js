import React, { Component } from "react";
import {
  Form,
  Dropdown,
  Input
} from "semantic-ui-react";
import {API_URL} from './constants'
import { SubmitButton, formCreater } from "./common";
import axios from 'axios'
import { Redirect } from 'react-router-dom'


export default class FamilyDetails extends Component {
  constructor(){
    super();
    this.state={
      familyDetails:{
        applicantId:"2",
        fatherName:"",
        fatherNationality:"",
        fatherPreviousNationality:"",
        fatherPlaceOfBirth:"",
        fatherBirthCountry:"",
        motherName:"",
        motherNationality:"",
        motherPreviousNationality:"",
        motherPlaceOfBirth:"",
        motherBirthCountry:""
      },
      countries: [],
      apiFlag:false
      
    }
  }
  handleValue =(event,{value,name})=>{
    let {familyDetails} = this.state;
    familyDetails[name]=value;
    this.setState({familyDetails});
}
handleSubmit =()=>{
  axios.post(`${API_URL}/parent_detail`, {
    data:this.state.familyDetails,
})
.then( (response)=> {
  this.setState({apiFlag:true})
  console.log(response);
})
.catch(function (error) {
  console.log(error);
})
}
  render() {

    if (this.state.apiFlag === true) {
      return <Redirect to='occupation_details' />
    }
    let {
      fatherName,
      fatherNationality,
      fatherPreviousNationality,
      fatherPlaceOfBirth,
      fatherBirthCountry,
      motherName,
      motherNationality,
      motherPreviousNationality,
      motherPlaceOfBirth,
      motherBirthCountry
    }= this.state;
    let {countries}=this.state;
    let array = [
      {
        type: "input",
        label: "Father Name",
        name:"fatherName",
        value: fatherName,
        handleFunc: this.handleValue,
        placeholder:"father name",
        props: {
          fluid: true
        }
      },
      {
        type: "select",
        label: "Nationality",
        name:"fatherNationality",
        value: fatherNationality,
        handleFunc: this.handleValue,
        placeholder:"Select Country",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },
      {
        type: "select",
        label: "Previous nationality",
        name:"fatherNationality",
        value: fatherPreviousNationality,
        handleFunc: this.handleValue,
        placeholder:"Select Country",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },
      {
        type: "input",
        label: "Place of birth",
        name:"fatherPlaceOfBirth",
        value: fatherPlaceOfBirth,
        handleFunc: this.handleValue,
        placeholder:"place of birth",
        props: {
          fluid: true
        }
      },
      {
        type: "select",
        label: "Country of birth",
        name:"fatherBirthCountry",
        value: fatherBirthCountry,
        handleFunc: this.handleValue,
        placeholder:"Select Country",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },
      {
        type: "input",
        label: "Mother Name",
        name:"motherName",
        value: motherName,
        handleFunc: this.handleValue,
        placeholder:"mother name",
        props: {
          fluid: true
        }
      },
      {
        type: "select",
        label: "Nationality",
        name:"motherNationality",
        value: motherNationality,
        handleFunc: this.handleValue,
        placeholder:"Select Country",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },
      {
        type: "select",
        label: "Previous nationality",
        name:"motherNationality",
        value: motherPreviousNationality,
        handleFunc: this.handleValue,
        placeholder:"Select Country",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },
      {
        type: "input",
        label: "Place of birth",
        name:"motherPlaceOfBirth",
        value: motherPlaceOfBirth,
        handleFunc: this.handleValue,
        placeholder:"place of birth",
        props: {
          fluid: true
        }
      },
      {
        type: "select",
        label: "Country of birth",
        name:"motherBirthCountry",
        value: motherBirthCountry,
        handleFunc: this.handleValue,
        placeholder:"Select Country",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },              
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
