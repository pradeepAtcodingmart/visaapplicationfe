import React, { Component } from "react";
import { Form, Dropdown, Input } from "semantic-ui-react";
import axios from "axios";
import { API_URL } from "./constants";
import { DateInput } from "semantic-ui-calendar-react";
import { SubmitButton, today, Countries, visaTypes, purposes ,formCreater } from "./common";
import { Redirect } from "react-router-dom";

export default class VisaApplication extends Component {
  constructor() {
    super();
    this.state = {
      basicDetails: {
        applicant_id: 1,
        visaApplyingFrom: "",
        indianMission: "",
        nationality: "",
        dob: "",
        email: "",
        reEnteredEmail: "",
        dateOfArrival: "",
        visaType: "",
        purpose: ""
      },
      countries: [],
      visaTypes: visaTypes,
      purposes: purposes,
      apiFlag: false
    };
  }

  componentDidMount() {
    Countries().then(data => {
      this.setState({ countries: data });
    });
  }
  handleValue = (event, { value, name }) => {
    let { basicDetails } = this.state;
    basicDetails[name] = value;
    this.setState({ basicDetails });
  };
  handleSubmit = () => {
    axios
      .post(`${API_URL}/profile_detail`, {
        data: this.state.basicDetails
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
    let { countries, visaTypes, purposes } = this.state;
    let array = [
      {
        type: "select",
        label: "Country you are applying visa from",
        name: "visaApplyingFrom",
        value: visaApplyingFrom,
        handleFunc: this.handleValue,
        placeholder: "Select Country",
        options: this.state.countries,
        props: {
          fluid: true,
          search: true,
          selection: true
        }
      },
      {
        type: "select",
        label: "Indian Mission",
        name: "indianMission",
        value: indianMission,
        handleFunc: this.handleValue,
        placeholder: "Select Mission",
        options: this.state.countries,
        props: {
          fluid: true,
          search: true,
          selection: true
        }
      },
      {
        type: "input",
        label: "Nationality",
        name: "nationality",
        value: nationality,
        handleFunc: this.handleValue,
        placeholder: "Select Nationality",
        props: {
          fluid: true
        }
      },
      {
        type: "date",
        label: "Date Of Birth",
        name: "dob",
        value: dob,
        handleFunc: this.handleValue,
        placeholder: "Date Of Birth",
        maxDate:today,
        minDate:new Date("01-01-1950"),
        iconPosition:"left",
        props: {
          fluid: true,
          required:true,
          readOnly:true
        }
      },
      {
        type: "input",
        label: "Email",
        name: "email",
        value: email,
        handleFunc: this.handleValue,
        placeholder: "Email",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Re Enter Email Id",
        name: "reEnteredEmail",
        value: reEnteredEmail,
        handleFunc: this.handleValue,
        placeholder: "Re Enter Email Id",
        props: {
          fluid: true
        }
      },
      {
        type: "date",
        label: "Date Of Arrival",
        name: "dateOfArrival",
        value: dateOfArrival,
        handleFunc: this.handleValue,
        placeholder: "Date Of Arrival",
        maxDate:today,
        minDate:new Date("01-01-1950"),
        iconPosition:"left",
        props: {
          fluid: true,
          required:true,
          readOnly:true
        }
      },
      {
        type: "select",
        label: "Visa Type",
        name: "visaType",
        value: visaType,
        handleFunc: this.handleValue,
        placeholder: "Visa Type",
        options:visaTypes,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },
      {
        type: "select",
        label: "Purpose",
        name: "purpose",
        value: purpose,
        handleFunc: this.handleValue,
        placeholder: "Purpose",
        options:purposes,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      }
    ];
    if (this.state.apiFlag === true) {
      return <Redirect to="/applicant_details" />;
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
