import React, { Component } from "react";
import { Form, Dropdown, Input } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { Countries, SubmitButton, today, formCreater } from "./common";
import { API_URL } from "./constants";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class PassportDetails extends Component {
  constructor() {
    super();
    this.state = {
      passportDetails: {
        applicantId: "1",
        passportNumber: "",
        placeOfIssue: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        countryOfIssue: "",
        country: ""
      },
      countries: [],
      apiFlag: false
    };
  }
  componentDidMount() {
    Countries().then(data => {
      this.setState({ countries: data });
    });
  }
  handleValue = (event, { value, name }) => {
    let { passportDetails } = this.state;
    passportDetails[name] = value;
    debugger
    this.setState({ passportDetails });
  };
  handleSubmit = () => {
    axios
      .post(`${API_URL}/passport_detail`, {
        data: this.state.passportDetails
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
      passportNumber,
      placeOfIssue,
      dateOfIssue,
      dateOfExpiry,
      countryOfIssue,
      country
    } = this.state.passportDetails;
    let { countries } = this.state;
    debugger
    let array = [
      {
        type: "input",
        label: "Passport number",
        name: "passportNumber",
        value: passportNumber,
        handleFunc: this.handleValue,
        placeholder: "passport name",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Place of Issue",
        name: "placeOfIssue",
        value: placeOfIssue,
        handleFunc: this.handleValue,
        placeholder: "Place of issue",
        props: {
          fluid: true
        }
      },
      {
        type: "date",
        label: "Date of issue",
        name: "dateOfIssue",
        value: dateOfIssue,
        handleFunc: this.handleValue,
        placeholder: "Date of issue",
        maxDate:today,
        minDate:new Date("01-01-1950"),
        iconPosition:"left",
        props: {
          fluid: true
        }
      },
      {
        type: "date",
        label: "Date of Expiry",
        name: "dateOfExpiry",
        value: dateOfExpiry,
        handleFunc: this.handleValue,
        placeholder: "Date of Expiry",
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
        label: "Country Of Issue",
        name: "countryOfIssue",
        value: countryOfIssue,
        handleFunc: this.handleValue,
        placeholder: "Select Country",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },
      {
        type: "select",
        label: "Nationality mentioned there in",
        name: "country",
        value: country,
        handleFunc: this.handleValue,
        placeholder: "Select Country",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      }
    ];
    let form = formCreater(array);
    if (this.state.apiFlag === true) {
      return <Redirect to="/address_details" />;
    }
    
    return (
      <Form onSubmit={this.handleSubmit}>
        {form}
        {SubmitButton}
      </Form>
    );
  }
}
