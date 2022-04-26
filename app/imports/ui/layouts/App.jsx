import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import AdminHomePage from '../pages/AdminHomePage';
import CompanyProfile from '../pages/CompanyProfile';
import StudentProfile from '../pages/StudentProfile';
import SignupCompany from '../pages/SignupCompany';
import StudentHomePage from '../pages/StudentHomePage';
import CompanyHomePage from '../pages/CompanyHomePage';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import SignupStudent from '../pages/SignupStudent';
import Signout from '../pages/Signout';
import ClassScheduleForm from '../pages/ClassScheduleForm';
import ViewStudentMatches from '../pages/ViewStudentMatches';
import ViewCompanyMatches from '../pages/ViewCompanyMatches';
import AddExperience from '../pages/AddExperience';
import SignupStudentEmail from '../pages/SignupStudentEmail';
import SignupCompanyEmail from '../pages/SignupCompanyEmail';


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
            <Route path="/student_signup" component={SignupStudentEmail}/>
            <Route path="/company_signup" component={SignupCompanyEmail}/>
            <Route path="/studentsignup" component={SignupStudent}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/companyprofile" component={CompanyProfile}/>
            <Route path="/studentprofile" component={StudentProfile}/>
            <Route path="/classform" component={ClassScheduleForm}/>
            <Route path="/scheduleform" component={ClassScheduleForm}/>
            <Route path="/companysignup" component={SignupCompany}/>
            <ProtectedRoute path="/addexp" component={AddExperience}/>
            <StudentProtectedRoute path="/studenthomepage" component={StudentHomePage}/>
            <StudentProtectedRoute path="/viewcompanymatches" component={ViewCompanyMatches}/>
            <CompanyProtectedRoute path="/companyhomepage" component={CompanyHomePage}/>
            <CompanyProtectedRoute path="/viewstudentmatches" component={ViewStudentMatches}/>
            <AdminProtectedRoute path="/admin" component={AdminHomePage}/>
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
const CompanyProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
      return (isLogged && isCompany) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
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
