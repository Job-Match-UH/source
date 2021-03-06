import React from 'react';
import { Card, Container, Tab, Loader, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import Company from '../components/Company';
import Student from '../components/Student';
import { Companies } from '../../api/company/Companies';
import { Students } from '../../api/student/Student';
import { CompanyTags } from '../../api/tags/CompanyTags';
import { StudentTags } from '../../api/tags/StudentTags';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
function alphaSortCompany(profiles) {
  return _.sortBy(profiles, function (profile) { return profile.companyName.toLowerCase(); });
}

function alphaSortStudent(profiles) {
  return _.sortBy(profiles, function (profile) { return profile.firstName.toLowerCase(); });
}

class AdminHomePage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Profiles</Loader>;
  }

  renderPage() {
    const panes = () => [
      {
        menuItem: 'Company Profiles', render: () => <Tab.Pane>
          <Card.Group centered>
            {(this.props.companies === '') ?
              <Header className='cp-text'>No companies to display</Header> :
              ((alphaSortCompany(this.props.companies)).map((company, index) => <Company
                key={index}
                company={company}
                tags={this.props.companyTags.filter(tag => (tag.owner === company.owner))}
              />)
              )}
          </Card.Group>
        </Tab.Pane>,
      },
      {
        menuItem: 'Student Profiles', render: () => <Tab.Pane>
          <Card.Group centered>
            {(this.props.students === '') ?
              <Header className='cp-text'>No students to display</Header> :
              ((alphaSortStudent(this.props.students)).map((student, index) => <Student
                key={index}
                student={student}
                tags={this.props.studentTags.filter(tag => (tag.owner === student.owner))}
              />)
              )
            }
          </Card.Group>
        </Tab.Pane>,
      },
      {
        menuItem: 'All Profiles', render: () => <Tab.Pane>
          <Card.Group centered>
            {alphaSortStudent(this.props.students).map((student, index) => <Student
              key={index}
              student={student}
              tags={this.props.studentTags.filter(tag => (tag.owner === student.owner))}
            />)}
            {alphaSortCompany(this.props.companies).map((company, index) => <Company
              key={index}
              company={company}
              tags={this.props.companyTags.filter(tag => (tag.owner === company.owner))}
            />)}
          </Card.Group>
        </Tab.Pane>,
      },
    ];

    return (
      <div>
        <Container id='admin-home-page' textAlign='center'>
          <Tab
            menu={{
              attached: true,
              tabular: true,
              style: {
                display: 'flex',
                justifyContent: 'center',
              },
            }} panes={panes()}/>
        </Container>
      </div>
    );
  }
}

// Require the presence of a Company document in the props object. Uniforms adds 'model' to the props, which we use.
AdminHomePage.propTypes = {
  companies: PropTypes.array,
  students: PropTypes.array,
  companyTags: PropTypes.array,
  studentTags: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Students.adminPublicationName);
  const sub2 = Meteor.subscribe(Companies.adminPublicationName);
  const sub3 = Meteor.subscribe(StudentTags.adminPublicationName);
  const sub4 = Meteor.subscribe(CompanyTags.adminPublicationName);
  const ready = sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready();
  // Get documents
  const companies = Companies.collection.find({}).fetch();
  const students = Students.collection.find({}).fetch();
  const companyTags = CompanyTags.collection.find({}).fetch();
  const studentTags = StudentTags.collection.find({}).fetch();
  return {
    companies,
    students,
    companyTags,
    studentTags,
    ready,
  };
})(AdminHomePage);
