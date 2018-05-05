import React from 'react';
import { Button, ButtonGroup, Card, CardTitle, Col } from 'reactstrap';

export default class Filters extends React.Component {
  render() {
    return (
      <Card body>
        <CardTitle>Filters</CardTitle>
        <div>
          <ButtonGroup>
            <Button outline>bike</Button>
            <Button outline>ped</Button>
            <Button outline>mv</Button>
            <Button outline>all</Button>
          </ButtonGroup>
        </div>
        <br />
        <div>
          <ButtonGroup>
            <Button outline>Injury</Button>
            <Button outline>Fatality</Button>
          </ButtonGroup>
        </div>
        <br />
        <div>
          <ButtonGroup>
            <Button outline>Monthly</Button>
            <Button outline>Yearly</Button>
          </ButtonGroup>
        </div>
      </Card>
    );
  }
}
