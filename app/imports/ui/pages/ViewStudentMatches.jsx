import React from 'react';
import { Header, Card, Image, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const pfp = 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewStudentMatches extends React.Component {
  render() {
    return (
      <Container id='view-student-matches'>
        <Header as='h2' className='cp-text' textAlign='center'>Interested Matches!</Header>
        <Card.Group itemsPerRow={4}>
        </Card.Group>
      </Container>
    );
  }
}

export default ViewStudentMatches;
