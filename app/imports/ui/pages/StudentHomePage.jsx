import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Button, Dropdown, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Company from '../components/Company';
import { Companies } from '../../api/company/Companies';

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
];

/** Renders the Page. */
class StudentHomePage extends React.Component {
  state = { options }

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }));
  }

  handleChange = (e, { value }) => this.setState({ currentValue: value })

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { currentValue } = this.state;
    return (
      <Container id='student-home-page'>
        <Grid textAlign='center' columns='equal'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Dropdown
                options={this.state.options}
                placeholder='Job Title, keywords or company'
                fluid
                multiple
                search
                selection
                noResultsMessage='Try another search.'
                allowAdditions
                value={currentValue}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                options={this.state.options}
                placeholder='City, state, zip code, or remote'
                fluid
                multiple
                search
                selection
                noResultsMessage='Try another search.'
                allowAdditions
                value={currentValue}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <Button className='cp-text'>Find Jobs</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Dropdown placeholder='Date Posted' compact multiple selection options={options} />
            <Dropdown placeholder='Within X miles' compact multiple selection options={options} />
            <Dropdown placeholder='Salary Estimate' compact multiple selection options={options} />
            <Dropdown placeholder='Job Type' compact multiple selection options={options} />
            <Dropdown placeholder='Certification' compact multiple selection options={options} />
            <Dropdown placeholder='Shift & Schedule' compact multiple selection options={options} />
            <Dropdown placeholder='Location' compact multiple selection options={options} />
            <Dropdown placeholder='Experience Level' compact multiple selection options={options} />
          </Grid.Row>
          <Grid.Row>
            <Header as='h2' className='cp-text'>Job Matches:</Header>
          </Grid.Row>
          <Grid.Row>
            <Card.Group centered>
              {this.props.companies.map((company, index) => <Company
                key={index}
                company={company}/>)}
            </Card.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Companies documents in the props.
StudentHomePage.propTypes = {
  companies: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Contacts documents.
  const subscription = Meteor.subscribe(Companies.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Contacts documents
  const companies = Companies.collection.find({}).fetch();
  return {
    companies,
    ready,
  };
})(StudentHomePage);
