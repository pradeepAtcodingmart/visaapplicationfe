import React, { Component } from 'react'
import { Button, Form,Container } from 'semantic-ui-react'
import axios from 'axios'
import {API_URL} from './constants'

export default class visaApplication extends Component {
  constructor(){
    super();
    this.state ={
      data:{
      fname:"",
      lname:""
      }
    }
  }
  handleValue =(event)=>{
    let {data}=this.state;
    data[event.target.name]=event.target.value;
    this.setState({data});
  }
  handleSubmit = ()=>{

   axios.post(`${API_URL}/api`, {
      data:this.state.data,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  }
  render() {
    return (
      <Container>
         <Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>First Name</label>
       <input placeholder='First Name' name="fname" onChange={this.handleValue}/>
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' name="lname" onChange={this.handleValue}/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
  </Container>
    )
  }
}
