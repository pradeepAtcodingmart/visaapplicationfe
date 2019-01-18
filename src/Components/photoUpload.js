import React, { Component } from "react";
import { API_URL } from "./constants";
import axios from "axios";
import { Button, Form, Input } from "semantic-ui-react";
export default class PhotoUpload extends Component {
  constructor() {
    super();
    this.state = {
      photo: ""
    };
  }
  fileHandler = e => {
    const reader = new FileReader();
    const self = this;
    reader.onload = function() {
      self.state.photo = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  handleSubmit =()=>{
    // window.location.href ="/"
    }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Field>
        <Input
          type="file"
          id="i"
          onChange={this.fileHandler}
          label="Browse"
          accept="image/x-png,image/gif,image/jpeg"
          name="PhotoUrl"
        />
        </Form.Field>
        <Form.Field>
          <Button
            color="green"
            name="submit"
            value="submit"
            type="submit"
            content="upload photo"
          />
        </Form.Field>
      </Form>
    );
  }
}
