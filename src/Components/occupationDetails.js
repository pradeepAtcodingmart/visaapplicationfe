import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";
import {  SubmitButton } from "./common";
import { API_URL } from "./constants";
import axios from "axios";
import { Redirect } from 'react-router-dom'

export default class OccupationDetails extends Component {
  constructor() {
    super();
    this.state = {
      occupationDetails: {
        applicantId:"1",
        presentOccupation: "",
        employerName: "",
        designation: "",
        address: "",
        pastOccupation: "",
        organization: "",
        rank: "",
        placeOfPosting: ""
      },
      apiFlag:false
    };
  }
  handleValue = (event,{name,value}) => {
    console.log(value)
    let { occupationDetails } = this.state;
    occupationDetails[name] = value;
    this.setState({ occupationDetails });
  };
  handleSubmit =()=>{
    axios.post(`${API_URL}/occupation_detail`, {
      data:this.state.occupationDetails,
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
      return <Redirect to='/visa_details' />
    }
    let {
      presentOccupation,
      employerName,
      designation,
      address,
      pastOccupation,
      organization,
      rank,
      placeOfPosting
    } = this.state.occupationDetails;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field inline required>
          <label>Present occupation</label>
          <Input
            fluid
            placeholder="Present occupation"
            name="presentOccupation"
            value={presentOccupation}
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Employer name</label>
          <Input
            fluid
            placeholder="Employer name"
            name="employerName"
            value={employerName}
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Designation</label>
          <Input
            fluid
            placeholder="Designation"
            name="designation"
            value={designation}
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Address</label>
          <Input
            fluid
            placeholder="address"
            name="address"
            value={address}
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Past occupation</label>
          <Input
            fluid
            placeholder="pastOccupation"
            name="pastOccupation"
            value={pastOccupation}
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Organization</label>
          <Input
            fluid
            placeholder="organization"
            name="organization"
            value={organization}
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Rank</label>
          <Input
            fluid
            placeholder="Rank"
            name="rank"
            value={rank}
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Place of posting</label>
          <Input
            fluid
            placeholder="Place of posting"
            name="placeOfPosting"
            value={placeOfPosting}
            onChange={this.handleValue}
          />
        </Form.Field>
        {SubmitButton}
      </Form>
    );
  }
}
