import React from "react";
import {
  Button,
  Form,
  Input,
  Dropdown
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import axios from 'axios'
import {API_URL} from './constants'
export const returnDropdownOptions = (items, key, value) => {
  return items.map(o => {
    return {
      key: o[key],
      text: o[value],
      value: o[value],
      title: o[value]
    };
  });
};

export const SubmitButton = (
  <Form.Field fluid="true" style={{textAlign:"center"}}>
    <Button
      color="green"
      name="submit"
      value="submit"
      type="submit"
      content="submit"
    />
  </Form.Field>
);
export const today  = new Date();

export const Countries = async () => {
  let res = await axios.get(`${API_URL}/all_countries`);
  let  data  = await returnDropdownOptions(res.data.data,"name","name" )
  return data;
}

export const visaTypes = [
  {
    key: "Tourist visa",
    text: "Tourist visa",
    value: "Tourist visa"
  },
  {
    key: "Entry visa",
    text: "Entry visa",
    value: "Entry visa"
  },
  {
    key: "Employment visa",
    text: "Employment visa",
    value: "Employment visa"
  },
  {
    key: "Intern visa",
    text: "Intern visa",
    value: "Intern visa"
  },
  {
    key: "Business visa",
    text: "Business visa",
    value: "Business visa"
  },
  {
    key: "Student visa",
    text: "Student visa",
    value: "Student visa"
  }

]

export const purposes= [
  {
    key: "Tourism",
    text: "Tourism",
    value: "Tourism"
  },
  {
    key: "Business",
    text: "Business",
    value: "Business"
  },
  {
    key: "Education",
    text: "Education",
    value: "Education"
  },
  {
    key: "Conference",
    text: "Conference",
    value: "Conference"
  }
]

export const formCreater = (form)=>{
let form1 = form.map((filed)=>{
   switch(filed.type){
     case "input" :
        return(
          <Form.Field inline required>
              <label>{filed.label}</label>
              <Input
              name={filed.name}
              value={filed.value}
              placeholder={filed.placeholder}
              onChange={filed.handleFunc}
              {...filed.props}
              />
        </Form.Field>
  );
  break;
  case "date" :
  return(
    <Form.Field inline required>
        <label>{filed.label}</label>
        <DateInput
        name={filed.name}
        value={filed.value}
        placeholder={filed.placeholder}
        onChange={filed.handleFunc}
        maxDate={filed.maxDate}
        minDate={filed.minDate}
        dateFormat={filed.dateFormat}
        iconPosition={filed.iconPosition}
        {...filed.props}
        />
  </Form.Field>
);
break;
case "select" :
return(
  <Form.Field inline required>
      <label>{filed.label}</label>
      <Dropdown
      name={filed.name}
      value={filed.value}
      placeholder={filed.placeholder}
      onChange={filed.handleFunc}
      options={filed.options}
      {...filed.props}
      />
</Form.Field>
);
break;
   }
            // return(
            //     <Form.Field inline required>
            //         <label>{filed.label}</label>
            //         <Input
            //         name={filed.name}
            //         value={filed.value}
            //         placeholder={filed.placeholder}
            //         onChange={filed.handleFunc}
            //         {...filed.props}
            //         />
            //   </Form.Field>
            // );
    }
);

return form1;
}