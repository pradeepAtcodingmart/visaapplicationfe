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
  componentWillMount(){
    axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=JtWbUqsMKk7yWvvCCDBymYJaWgVelosk")
    .then(response => {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  componentDidMount() {
    Countries().then(data => {
      this.setState({ countries: data });
    });
  }
  handleValue = (event, { value, name }) => {
    let { passportDetails } = this.state;
    passportDetails[name] = value;
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
        handleFunc: this.handleValueport,
        placeholder: "Place of issue",
        props: {
          fluid: true
        }
      },
      {
        type: "DateInputs",
        label: "Date of issue",
        name: "dateOfIssue",
        value: dateOfIssue,
        handleFunc: this.handleValues,
        placeholder: "Date of issue",
        props: {
          fluid: true
        }
      },
      {
        type: "date",
        label: "Date of Expiry",
        name: "dateOfExpiry",
        value: dateOfExpiry,
        handleFunc: this.handleValues,
        placeholder: "Date of Expiry",
        maxDate:today,
        minDate:new Date("01-01-1950"),
        dateFormat:"DD-MM-YYYY",
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
        handleFunc: this.handleValues,
        placeholder: "Select Country",
        options:this.state.countries,
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
        handleFunc: this.handleValues,
        placeholder: "Select Country",
        options:this.state.countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      }
    ];
    let form = formCreater(array);
    console.log(form);
    if (this.state.apiFlag === true) {
      return <Redirect to="/address_details" />;
    }
    let {
      passportNumber,
      placeOfIssue,
      dateOfIssue,
      dateOfExpiry,
      countryOfIssue,
      country
    } = this.state.passportDetails;
    let { countries } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        {form}
        {/* <Form.Field inline required>
                <label>Passport Number</label>
                <Input fluid placeholder="Passport number" name="passportNumber"  value={passportNumber} onChange={this.handleValue}/>
              </Form.Field> */}
        {/* <Form.Field inline required>
          <label>Place of Issue</label>
          <Input
            fluid
            placeholder="Place of issue"
            name="placeOfIssue"
            value={placeOfIssue}
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline>
          <label>Date of issue</label>
          <DateInput
            name="dateOfIssue"
            required
            readOnly
            fluid
            placeholder="Date of issue"
            maxDate={today}
            // initialDate={dob}
            value={dateOfIssue}
            startMode={"year"}
            dateFormat={"DD-MM-YYYY"}
            iconPosition="left"
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline>
          <label>Date of expiry</label>
          <DateInput
            name="dateOfExpiry"
            required
            readOnly
            fluid
            placeholder="Date of expiry"
            // initialDate={dob}
            maxDate={today}
            value={dateOfExpiry}
            startMode={"year"}
            dateFormat={"DD-MM-YYYY"}
            iconPosition="left"
            onChange={this.handleValue}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Country of Issue</label>
          <Dropdown
            fluid
            placeholder="Select Country"
            name="countryOfIssue"
            value={countryOfIssue}
            onChange={this.handleValue}
            search
            selection
            options={countries}
          />
        </Form.Field>
        <Form.Field inline required>
          <label>Nationality mentioned there in</label>
          <Dropdown
            fluid
            placeholder="Select Country"
            name="country"
            value={country}
            onChange={this.handleValue}
            search
            selection
            options={countries}
          />
        </Form.Field> */}
        {SubmitButton}
      </Form>
    );
  }
}
