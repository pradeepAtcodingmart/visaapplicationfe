import React, { Component } from "react";
import { Form, Dropdown, Input } from "semantic-ui-react";
import { Countries, SubmitButton ,formCreater} from "./common";
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
    let {
      street,
      village,
      state,
      country,
      pincode,
      mobileNo
    } = this.state.addressDetails;
    let { countries } = this.state;
    let array = [
      {
        type: "input",
        label: "House No./Street",
        name: "street",
        value: street,
        handleFunc: this.handleValue,
        placeholder: "House No./Street",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Village/Town/City",
        name: "village",
        value: village,
        handleFunc: this.handleValue,
        placeholder: "Village/Town/City",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "State",
        name: "state",
        value: state,
        handleFunc: this.handleValue,
        placeholder: "State",
        props: {
          fluid: true
        }
      },
      {
        type: "select",
        label: "Country",
        name: "country",
        value: country,
        handleFunc: this.handleValue,
        placeholder: "Country",
        options:countries,
        props: {
          fluid: true,
          search:true,
          selection:true
        }
      },
      {
        type: "input",
        label: "Mobile No",
        name: "mobileNo",
        value: mobileNo,
        handleFunc: this.handleValue,
        placeholder: "Mobile No",
        props: {
          fluid: true
        }
      },
      {
        type: "input",
        label: "Pincode",
        name: "pincode",
        value: pincode,
        handleFunc: this.handleValue,
        placeholder: "Pincode",
        props: {
          fluid: true
        }
      }
    ]
    let form = formCreater(array);
    if (this.state.apiFlag === true) {
      return <Redirect to='/family_details' />
    }

    return (
      <Form
      onSubmit ={this.handleSubmit}
      >
        {form}
        {SubmitButton}
      </Form>
    );
  }
}
