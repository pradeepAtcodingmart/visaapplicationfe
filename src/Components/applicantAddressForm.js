import React, { Component } from "react";
import { Form, Dropdown, Input } from "semantic-ui-react";
import { Countries, SubmitButton } from "./common";
import { API_URL } from "./constants";
import axios from "axios";
import { Redirect } from 'react-router-dom'

export default class ApplicantAddressForm extends Component {
  constructor() {
    super();
    this.state = {
      addressDetails: {
        applicantId:"2",
        street: "",
        village: "",
        state: "",
        country: "",
        pincode: "",
        mobileNo: ""
      },
      countries: [],
      apiFlag:false
    };
  }
  componentDidMount(){
    Countries().then(data => {
     this.setState({countries: data})
;})
    }
  handleValue =(event,{value,name})=> {
    let {addressDetails} = this.state;    
    addressDetails[name]=value;
    this.setState({addressDetails});
  }
  handleSubmit =()=>{
    axios.post(`${API_URL}/address_detail`, {
      data:this.state.addressDetails,
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
      return <Redirect to='/family_details' />
    }
    let {
      street,
      village,
      state,
      country,
      pincode,
      mobileNo
    } = this.state.addressDetails;
    let { countries } = this.state;
    return (
      <Form
      onSubmit ={this.handleSubmit}
      >
        <Form.Field inline required>
          <label>House No./Street</label>
          <Input name="street" fluid placeholder="House No./Street" value={street} onChange={this.handleValue} />
        </Form.Field>
        <Form.Field inline required>
          <label>Village/Town/City</label>
          <Input name="village" fluid placeholder="Village/Town/City" value={village} onChange={this.handleValue} />
        </Form.Field>
        <Form.Field inline required>
          <label>State</label>
          <Input name="state" value={state} fluid placeholder="State" onChange={this.handleValue} />
        </Form.Field>
        <Form.Field inline required>
          <label>Country</label>
          <Dropdown
            name="country"
            value={country}
            onChange={this.handleValue}
            fluid placeholder="Select Country"
            search
            selection
            options={countries}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Postal/Zip code</label>
          <Input name="pincode" value={pincode} fluid placeholder="Zip code" onChange={this.handleValue} />
        </Form.Field>
        <Form.Field required inline>
          <label>Phone Number</label>
          <Input
            name="mobileNo"
            value={mobileNo}
            onChange={this.handleValue}
            fluid placeholder="Phone Number"
            // validations={{
            //   minLength: validations.minPhoneCharacters,
            //   maxLength: validations.maxPhoneCharacters
            // }}
            // validationErrors={{
            //   minLength: validations.phoneMinError,
            //   maxLength: validations.phoneMaxError
            // }}
            // errorLabel={<div className="errorLabel" />}
          />
        </Form.Field>
        {SubmitButton}
      </Form>
    );
  }
}
