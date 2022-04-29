import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
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
import ClassScheduleForm from '../pages/ClassScheduleForm';
import AddExperience from '../pages/AddExperience';
import AddEducation from '../pages/AddEducation';
import AddProject from '../pages/AddProject';
import StudentHomePage from '../pages/StudentHomePage';
import CompanyHomePage from '../pages/CompanyHomePage';
import AdminHomePage from '../pages/AdminHomePage';
import ViewStudentMatches from '../pages/ViewStudentMatches';
import ViewCompanyMatches from '../pages/ViewCompanyMatches';
import NotFound from '../pages/NotFound';
import EditEducation from '../pages/EditEducation';
import EditExperience from '../pages/EditExperience';
import EditProject from '../pages/EditProject';
import EditStudent from '../pages/EditStudent';

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
            <StudentProtectedRoute path="/studentprofile/:_id" component={StudentProfile}/>
            <CompanyProtectedRoute path="/companyprofile/:_id" component={CompanyProfile}/>
            <Route path="/classform" component={ClassScheduleForm}/>
            <ProtectedRoute path="/addexp" component={AddExperience}/>
            <ProtectedRoute path="/addedu" component={AddEducation}/>
            <ProtectedRoute path="/addproject" component={AddProject}/>
            <ProtectedRoute path="/editeducation/:_id" component={EditEducation}/>
            <ProtectedRoute path="/editexperience/:_id" component={EditExperience}/>
            <ProtectedRoute path="/editproject/:_id" component={EditProject}/>
            <ProtectedRoute path="/editstudent/:_id" component={EditStudent}/>
            <StudentProtectedRoute path="/studenthomepage" component={StudentHomePage}/>
            <CompanyProtectedRoute path="/companyhomepage" component={CompanyHomePage}/>
            <CompanyProtectedRoute path="/jobpostings" component={JobPostings}/>
            <AdminProtectedRoute path="/admin" component={AdminHomePage}/>
            <CompanyProtectedRoute path="/viewstudentmatches" component={ViewStudentMatches}/>
            <StudentProtectedRoute path="/viewcompanymatches" component={ViewCompanyMatches}/>
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

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const StudentProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
      return (isLogged && isStudent) ?
        (<Component {...props} />) :
        (Meteor.logout() || <Redirect to={{ pathname: '/signin', state: { from: props.location }, error: 'Unauthorized login' }}/>
        );
    }}
  />
);

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const CompanyProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
      return (isLogged && isCompany) ?
        (<Component {...props} />) :
        (Meteor.logout() || <Redirect to={{ pathname: '/signin', state: { from: props.location }, error: 'Unauthorized login' }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
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

// Require a component and location to be passed to each ProtectedRoute.
StudentProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each CompanyProtectedRoute.
CompanyProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
