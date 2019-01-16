import React, { Component } from "react";
import {
  Form,
  Dropdown,
  Input
} from "semantic-ui-react";
import {API_URL} from './constants'
import { SubmitButton } from "./common";
import axios from 'axios'

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
      countries: []
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
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
})
  window.location.href ="/occupation_details"
}
  render() {
    debugger
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
    return (
            <Form onSubmit={this.handleSubmit}>
              <Form.Field inline required>
                <label>Father Name</label>
                <Input name="name" fluid placeholder="father name" value={fatherName} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Nationality</label>
                <Dropdown fluid placeholder="Select Country" name={fatherNationality} search selection options={countries} onChange={this.handleValue} />
              </Form.Field>
              <Form.Field inline required>
                <label>Previous nationality</label>
                <Dropdown fluid placeholder="Select Country" name={fatherPreviousNationality} search selection options={countries} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Place of birth</label>
                <Input name="placeOfBirth"  fluid placeholder="place of birth" value={fatherPlaceOfBirth} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Country of birth</label>
                <Dropdown fluid placeholder="Select Country" name={fatherBirthCountry} search selection options={countries} />
              </Form.Field>
              <Form.Field inline required>
                <label>Mother Name</label>
                <Input name="mother name" fluid placeholder="name" value={motherName} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Nationality</label>
                <Dropdown fluid placeholder="Select Country" name={motherNationality} search selection options={countries} onChange={this.handleValue} />
              </Form.Field>
              <Form.Field inline required>
                <label>Previous nationality</label>
                <Dropdown fluid placeholder="Select Country" name={motherPreviousNationality} search selection options={countries} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Place of birth</label>
                <Input name="placeOfBirth"  fluid placeholder="place of birth" value={motherPlaceOfBirth} onChange={this.handleValue}/>
              </Form.Field>
              <Form.Field inline required>
                <label>Country of birth</label>
                <Dropdown fluid placeholder="Select Country" name={motherBirthCountry} onChange={this.handleValue} search selection options={[]} />
              </Form.Field>
              {SubmitButton}
            </Form>
    );
  }
}
