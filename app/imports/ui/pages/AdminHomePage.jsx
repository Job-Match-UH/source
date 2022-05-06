import React from 'react';
import { Card, Container, Tab, Loader, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Company from '../components/Company';
import Student from '../components/Student';
import { Companies } from '../../api/company/Companies';
import { Students } from '../../api/student/Student';
import { Tags } from '../../api/tags/Tags';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
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
              (this.props.companies.map((company, index) => <Company
                key={index}
                company={company}
                tags={this.props.tags.filter(tag => (tag.owner === company.owner))}
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
              (this.props.students.map((student, index) => <Student
                key={index}
                student={student}
                tags={this.props.tags.filter(tag => (tag.owner === student.owner))}
              />)
              )
            }
          </Card.Group>
        </Tab.Pane>,
      },
      {
        menuItem: 'All Profiles', render: () => <Tab.Pane>
          <Card.Group centered>
            {this.props.students.map((student, index) => <Student
              key={index}
              student={student}
              tags={this.props.tags.filter(tag => (tag.owner === student.owner))}
            />)}
            {this.props.companies.map((company, index) => <Company
              key={index}
              company={company}
              tags={this.props.tags.filter(tag => (tag.owner === company.owner))}
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
  companies: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Students.adminPublicationName);
  const sub2 = Meteor.subscribe(Companies.adminPublicationName);
  const sub3 = Meteor.subscribe(Tags.adminPublicationName);
  const ready = (sub1.ready() && sub2.ready()) || sub3.ready();
  // Get documents
  const companies = Companies.collection.find({}).fetch();
  const students = Students.collection.find({}).fetch();
  const tags = Tags.collection.find({}).fetch();
  return {
    companies,
    students,
    tags,
    ready,
  };
})(AdminHomePage);
