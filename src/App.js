import React, { Component } from "react";
import VisaApplication from "./Components/visaApplication";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Login from "./Components/login";
import { Container, Card, Image } from "semantic-ui-react";
import ApplicantDetails from "./Components/applicantDetails";
import PassportDetails from "./Components/passportDetails";
import ApplicantAddressForm from "./Components/applicantAddressForm";
import FamilyDetails from "./Components/familyDetails";
import OccupationDetails from "./Components/occupationDetails";
import VisaDetails from "./Components/visaDetails";
import PhotoUpload from "./Components/photoUpload";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Container>
            <Card raised fluid>
              <Card.Content>
                <Image src="https://indianvisaonline.gov.in/visa/images/banner1.jpg" />
                <Card.Header
                  textAlign="center"
                  style={{ backgroundColor: "#DDACD6", padding: 10 }}
                >
                  Online Visa Application
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <div style={{ paddingRight: 200, paddingLeft: 200 }}>
                  {/* <Route exact path="/" component={Login} /> */}
                  <Route exact path="/" component={VisaApplication} />
                  <Route
                    exact
                    path="/applicant_details"
                    component={ApplicantDetails}
                  />
                  <Route
                    exact
                    path="/passport_details"
                    component={PassportDetails}
                  />
                  <Route
                    exact
                    path="/address_details"
                    component={ApplicantAddressForm}
                  />
                  <Route
                    exact
                    path="/family_details"
                    component={FamilyDetails}
                  />
                  <Route
                    exact
                    path="/occupation_details"
                    component={OccupationDetails}
                  />
                  <Route exact path="/visa_details" component={VisaDetails} />
                  <Route exact path="/photo_upload" component={PhotoUpload} />
                </div>
              </Card.Content>
            </Card>
          </Container>
        </Router>
        {/* <VisaApplication/> */}
        {/* <App1/>  */}
        {/* <PersonalDetails /> */}
      </div>
    );
  }
}

export default App;
