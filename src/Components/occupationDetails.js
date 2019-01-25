import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";
import { SubmitButton,formCreater } from "./common";
import { API_URL } from "./constants";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class OccupationDetails extends Component {
  constructor() {
    super();
    this.state = {
      occupationDetails: {
        applicantId: "1",
        presentOccupation: "",
        employerName: "",
        designation: "",
        address: "",
        pastOccupation: "",
        organization: "",
        rank: "",
        placeOfPosting: ""
      },
      apiFlag: false
    };
  }
  handleValue = (event, { name, value }) => {
    console.log(value);
    let { occupationDetails } = this.state;
    occupationDetails[name] = value;
    this.setState({ occupationDetails });
  };
  handleSubmit = () => {
    axios
      .post(`${API_URL}/occupation_detail`, {
        data: this.state.occupationDetails
      })
      .then(response => {
        this.setState({ apiFlag: true });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
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
    let array = [
      {
        type: "input",
        label: "Prsent Occupation",
        name: "presentOccupation",
        value: presentOccupation,
        handleFunc: this.handleValue,
        placeholder: "Present Occupation",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Employer Name",
        name: "employerName",
        value: employerName,
        handleFunc: this.handleValue,
        placeholder: "Employer Name",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Designation",
        name: "designation",
        value: designation,
        handleFunc: this.handleValue,
        placeholder: "Designation",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Address",
        name: "address",
        value: address,
        handleFunc: this.handleValue,
        placeholder: "Address",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Past Occupation",
        name: "pastOccupation",
        value: pastOccupation,
        handleFunc: this.handleValue,
        placeholder: "Past Occupation",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Rank",
        name: "rank",
        value: rank,
        handleFunc: this.handleValue,
        placeholder: "Rank",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Place Of Posting",
        name: "placeOfPosting",
        value: placeOfPosting,
        handleFunc: this.handleValue,
        placeholder: "Place Of Posting",
        props: {
          fluid: true
        }
      }
    ];
    if (this.state.apiFlag === true) {
      return <Redirect to="/visa_details" />;
    }
    let form = formCreater(array);
    return (
      <Form onSubmit={this.handleSubmit}>
        {form}
        {SubmitButton}
      </Form>
    );
  }
}
