import React from "react";
import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import ReactDatePicker from "react-jsonschema-form-extras/lib/ReactDatePicker";
import 'react-day-picker/lib/style.css';

const schema = {
  "title": "Custom validation",
  "description": "This form defines custom validation rules checking that the two passwords match.",
  "type": "object",
  "properties": {
    "pass1": {
      "title": "Password",
      "type": "string",
      "minLength": 3
    },
    "pass2": {
      "title": "Repeat password",
      "type": "string",
      "minLength": 3
    },
    "age": {
      "title": "Age",
      "type": "number",
      "minimum": 18
    },
    "username": {
      "title": "username",
      "type": "string",
      "minLength": 5

    }
  }
}

const uiSchema = {

  "pass1": {
    "ui:widget": "password",
    "ui:display":"inline"
  },
  "pass2": {
    "ui:widget": "password"
  }
}

export default class App1 extends React.Component{
  render(){
    return(
    <div className="containe">
     <Form
       schema={schema}
       uiSchema={uiSchema}
       fields={{ typeahead: TypeaheadField, rdp: ReactDatePicker }}
       onSubmit={this.submithandle}
     />
    </div>
    )
  }
}

