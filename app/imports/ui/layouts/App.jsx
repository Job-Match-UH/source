import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Signin from '../pages/Signin';
import Signout from '../pages/Signout';
import SignupStudentEmail from '../pages/SignupStudentEmail';
import SignupCompanyEmail from '../pages/SignupCompanyEmail';
import SignupStudent from '../pages/SignupStudent';
import SignupCompany from '../pages/SignupCompany';
import StudentProfile from '../pages/StudentProfile';
import CompanyProfile from '../pages/CompanyProfile';
import JobPostings from '../pages/JobPostings';
import AddExperience from '../pages/AddExperience';
import AddEducation from '../pages/AddEducation';
import AddProject from '../pages/AddProject';
import AdminHomePage from '../pages/AdminHomePage';
import ViewStudentMatches from '../pages/ViewStudentMatches';
import ViewStudentProfile from '../pages/ViewStudentProfile';
import ViewCompanyProfile from '../pages/ViewCompanyProfile';
import ViewCompanyMatches from '../pages/ViewCompanyMatches';
import NotFound from '../pages/NotFound';
import EditEducation from '../pages/EditEducation';
import EditExperience from '../pages/EditExperience';
import EditProject from '../pages/EditProject';
import EditStudent from '../pages/EditStudent';
import EditCompany from '../pages/EditCompany';
import EditJob from '../pages/EditJob';
import ViewJobDescription from '../pages/ViewJobDescription';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/student_signup" component={SignupStudentEmail}/>
            <Route path="/company_signup" component={SignupCompanyEmail}/>
            <Route path="/studentsignup" component={SignupStudent}/>
            <Route path="/companysignup" component={SignupCompany}/>
            <ProtectedRoute path="/studentprofile/:_id" component={StudentProfile}/>
            <ProtectedRoute path="/companyprofile/:_id" component={CompanyProfile}/>
            <ProtectedRoute path="/addexp" component={AddExperience}/>
            <ProtectedRoute path="/addedu/:_id" component={AddEducation}/>
            <ProtectedRoute path="/addproject" component={AddProject}/>
            <ProtectedRoute path="/editeducation/:_id" component={EditEducation}/>
            <ProtectedRoute path="/editexperience/:_id" component={EditExperience}/>
            <ProtectedRoute path="/editproject/:_id" component={EditProject}/>
            <ProtectedRoute path="/editstudent/:_id" component={EditStudent}/>
            <ProtectedRoute path="/editcompany/:_id" component={EditCompany}/>
            <ProtectedRoute path="/editjob/:_id" component={EditJob}/>
            <ProtectedRoute path="/jobdescription/:_id" component={ViewJobDescription}/>
            <ProtectedRoute path="/viewstudent/:_id" component={ViewStudentProfile}/>
            <ProtectedRoute path="/viewcompany/:_id" component={ViewCompanyProfile}/>
            <ProtectedRoute path="/jobpostings" component={JobPostings}/>
            <ProtectedRoute path="/admin" component={AdminHomePage}/>
            <ProtectedRoute path="/viewstudentmatches" component={ViewStudentMatches}/>
            <ProtectedRoute path="/viewcompanymatches" component={ViewCompanyMatches}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
