import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Modal from '../components/Modal';

export default function Filters(props) {
  return (
    <div>
      <Row className="ml-2">
        <h3 className="mt-3 font-weight-bold">Traffic Crashes</h3>
        <Modal />
      </Row>
      <Card>
        <ButtonGroup className="m-2" color="info">
          <Button
            outline
            onClick={() => props.modeChange('mv')}
            active={props.modeSelection === 'mv'}
            className="w-25"
          >
            <FontAwesome name="car" />
          </Button>
          <Button
            outline
            onClick={() => props.modeChange('ped')}
            active={props.modeSelection === 'ped'}
            className="w-25"
          >
            <FontAwesome name="street-view" />
          </Button>
          <Button
            outline
            onClick={() => props.modeChange('bike')}
            active={props.modeSelection === 'bike'}
            className="w-25"
          >
            <FontAwesome name="bicycle" />
          </Button>
          <Button
            outline
            onClick={() => props.modeChange('all')}
            active={props.modeSelection === 'all'}
            className="w-25"
          >
            All
          </Button>
        </ButtonGroup>
        <Form className="m-2">
          <FormGroup>
            <Label for="from">From Date:</Label>
            <Input
              id="from"
              type="date"
              onChange={props.fromChange}
              name="from"
              value={props.fromDate}
              className="mb-1"
            />
            <Label for="to">To Date:</Label>
            <Input
              id="to"
              type="date"
              onChange={props.toChange}
              name="to"
              value={props.toDate}
            />
          </FormGroup>
        </Form>
      </Card>
      <Card className="mt-2">
        <CardTitle className="m-2">Legend</CardTitle>
        <Row>
          <img
            src="./static/marker-11-red.svg"
            width="20px"
            height="20px"
            className="ml-4"
          />
          <p>Pedestrian</p>
        </Row>
        <Row>
          <img
            src="./static/marker-11-yellow.svg"
            width="20px"
            height="20px"
            className="ml-4"
          />
          <p>Bicyclist</p>
        </Row>
        <Row>
          <img
            src="./static/marker-11-blue.svg"
            width="20px"
            height="20px"
            className="ml-4"
          />
          <p>Motor Vehicle</p>
        </Row>
      </Card>
      <Row className="mt-2 ml-1 align-middle">
        <img
          src="./static/emsSeal.png"
          width="50px"
          height="50px"
          className="p-1"
        />
        <img
          src="./static/bpdSeal.jpg"
          width="50px"
          height="55px"
          className="p-1"
        />
        <img
          src="./static/gisSeal.jpg"
          width="50px"
          height="50px"
          className="p-1"
        />
      </Row>
    </div>
  );
}

Filters.propTypes = {
  fromDate: PropTypes.string,
  fromChange: PropTypes.func,
  toDate: PropTypes.string,
  toChange: PropTypes.func,
  modeSelection: PropTypes.string,
  modeChange: PropTypes.func,
};
